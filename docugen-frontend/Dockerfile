# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration=development

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the compiled Angular files to Nginx
COPY --from=build /app/dist/docugen-frontend/browser /usr/share/nginx/html
EXPOSE 80
# Simple Nginx configuration to handle Angular routing
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html index.htm; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
