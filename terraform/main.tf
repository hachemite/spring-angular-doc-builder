provider "aws" {
  region = "eu-west-3" 
}

resource "random_id" "bucket_id" {
  byte_length = 4
}

# 1. Document Storage
resource "aws_s3_bucket" "docugen_storage" {
  bucket = "docugen-pro-storage-${random_id.bucket_id.hex}"
}

# ========================================================
# 2. THE $0 NETWORK (IPv6 Enabled VPC)
# ========================================================
resource "aws_vpc" "main" {
  cidr_block                       = "10.0.0.0/16"
  assign_generated_ipv6_cidr_block = true
  enable_dns_support               = true
  enable_dns_hostnames             = true
  tags = { Name = "DocuGen-IPv6-VPC" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "rt" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.igw.id
  }
}

# Subnet A (Where the EC2 Server lives)
resource "aws_subnet" "subnet_a" {
  vpc_id                          = aws_vpc.main.id
  availability_zone               = "eu-west-3a"
  cidr_block                      = "10.0.1.0/24"
  ipv6_cidr_block                 = cidrsubnet(aws_vpc.main.ipv6_cidr_block, 8, 1)
  assign_ipv6_address_on_creation = true
  # CRITICAL: This disables the paid IPv4 address
  map_public_ip_on_launch         = false 
}

# Subnet B (Required because RDS needs at least 2 Availability Zones)
resource "aws_subnet" "subnet_b" {
  vpc_id                          = aws_vpc.main.id
  availability_zone               = "eu-west-3b"
  cidr_block                      = "10.0.2.0/24"
  ipv6_cidr_block                 = cidrsubnet(aws_vpc.main.ipv6_cidr_block, 8, 2)
  assign_ipv6_address_on_creation = true
  map_public_ip_on_launch         = false
}

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.subnet_a.id
  route_table_id = aws_route_table.rt.id
}

resource "aws_route_table_association" "b" {
  subnet_id      = aws_subnet.subnet_b.id
  route_table_id = aws_route_table.rt.id
}

# ========================================================
# 3. FIREWALLS (Security Groups)
# ========================================================
resource "aws_security_group" "backend_sg" {
  name        = "docugen-ipv6-sg"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    ipv6_cidr_blocks = ["::/0"] # Allow SSH via IPv6
  }

  ingress {
    from_port        = 8080 # Docker Compose runs the backend on 8080
    to_port          = 8080
    protocol         = "tcp"
    ipv6_cidr_blocks = ["::/0"] # Allow Frontend to hit the API via IPv6
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_security_group" "db_sg" {
  name   = "docugen-db-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.backend_sg.id]
  }
}

# ========================================================
# 4. DATABASES & SERVERS
# ========================================================
resource "aws_db_subnet_group" "db_subnets" {
  name       = "docugen-db-subnets"
  subnet_ids = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
}

resource "aws_db_instance" "docugen_db" {
  allocated_storage      = 20
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = "db.t3.micro" 
  db_name                = "docugendb"
  username               = "postgres"
  password               = var.db_password
  skip_final_snapshot    = true
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
}

resource "aws_instance" "docugen_backend" {
  ami                    = "ami-00983e8a26e4c9bd9"
  instance_type          = "t3.micro"              
  subnet_id              = aws_subnet.subnet_a.id
  vpc_security_group_ids = [aws_security_group.backend_sg.id]
  
  # CRITICAL: Forces AWS to give this instance an IPv6 address
  ipv6_address_count     = 1 

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install docker.io docker-compose git -y
              systemctl start docker
              systemctl enable docker

              mkdir -p /opt/docugen
              cd /opt/docugen

              cat <<EOT >> .env
              DB_HOST=${aws_db_instance.docugen_db.address}
              DB_NAME=${aws_db_instance.docugen_db.db_name}
              DB_USER=${aws_db_instance.docugen_db.username}
              DB_PASS=${var.db_password}
              AWS_REGION=eu-west-3
              S3_BUCKET_NAME=${aws_s3_bucket.docugen_storage.bucket}
              SES_SMTP_USERNAME=${var.ses_smtp_username}
              SES_SMTP_PASSWORD=${var.ses_smtp_password}
              GROQ_API_KEY=${var.groq_api_key}
              EOT
              chmod 600 .env

              git clone https://oauth2:${var.github_token}@github.com/hachemite/spring-angular-doc-builder.git .
              cd "DocuGen Pro"
              docker-compose --env-file ../.env up -d --build
              EOF

  tags = { Name = "DocuGen-Pro-Backend" }
}

# ========================================================
# 5. FRONTEND & EMAIL
# ========================================================
resource "aws_amplify_app" "docugen_frontend" {
  name         = "docugen-pro-frontend"
  repository   = "https://github.com/hachemite/spring-angular-doc-builder"
  access_token = var.github_token

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - cd docugen-frontend
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: docugen-frontend/dist/docugen-frontend/browser
        files:
          - '**/*'
      cache:
        paths:
          - docugen-frontend/node_modules/**/*
  EOT
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.docugen_frontend.id
  branch_name = "main"
}

resource "aws_ses_email_identity" "docugen_email" {
  email = var.sender_email
}

# ========================================================
# OUTPUTS
# ========================================================
output "backend_ipv6_address" {
  value       = aws_instance.docugen_backend.ipv6_addresses[0]
  description = "The IPv6 Address of your Spring Boot Server"
}