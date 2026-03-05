# Use official Node.js LTS image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files to working directory
COPY . .

# Expose the port your app uses
EXPOSE 3000

# Command to run the app
CMD ["node", "app.js"]