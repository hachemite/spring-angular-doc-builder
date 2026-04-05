variable "db_password" {
  description = "Database password"
  sensitive   = true
}

variable "github_token" {
  description = "GitHub PAT for Amplify and Git Clone"
  sensitive   = true
}

variable "sender_email" {
  description = "The email address you will use to send documents via SES"
  type        = string
  default     = "your.real.email@gmail.com" # CHANGE THIS
}

variable "ses_smtp_username" {
  description = "Amazon SES SMTP Username"
  sensitive   = true
}

variable "ses_smtp_password" {
  description = "Amazon SES SMTP Password"
  sensitive   = true
}

variable "groq_api_key" {
  description = "Groq API Key for AI generation"
  sensitive   = true
}