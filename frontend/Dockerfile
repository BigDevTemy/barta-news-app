# Base Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the development server port (Vite default is 5173)
EXPOSE 5173

# Use Vite's development server
CMD ["npm", "run", "dev"]
