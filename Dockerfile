# --- Stage 1: Build the Angular application ---
# Use a Node.js image as the base for building
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Install gettext-base for envsubst (for Debian/Ubuntu based images)
# If you are using Alpine, use `apk add gettext` instead
RUN apk add gettext

# Build the Angular application
# Use the --configuration flag to specify the environment if needed
RUN npm run build --configuration=production

# Run envsubst to replace placeholders in environment.ts with actual environment variable values
#RUN envsubst < src/environments/environment.ts > src/environments/environment.tmp.ts && mv src/environments/environment.tmp.ts src/environments/environment.ts

# --- Stage 2: Serve the application ---
# Use a lightweight web server image (e.g., Nginx or http-server)
FROM nginx:alpine

# Copy the custom Nginx configuration => example 1
#COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy Nginx Files => example 2
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application files from the builder stage
COPY --from=builder /app/dist/myapp/browser /usr/share/nginx/html

# Expose the port Nginx is listening on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
