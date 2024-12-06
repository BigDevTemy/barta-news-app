# Stage 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port (use the correct port for Nginx, typically 80)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]