# Use a Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose ports 80 and 443 for HTTP and HTTPS
EXPOSE 3000

# compiling the app
CMD ["npm", "run", "start"]