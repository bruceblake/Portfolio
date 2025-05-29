FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create .env file with placeholder
RUN echo "GEMINI_API_KEY=your-gemini-api-key-here" > .env
RUN echo "PORT=3000" >> .env

# Expose ports
EXPOSE 3000 5173

# Install concurrently globally for running both servers
RUN npm install -g concurrently

# Start both servers
CMD ["npm", "run", "dev:all"]