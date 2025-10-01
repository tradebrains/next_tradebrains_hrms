# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json first to leverage cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app /app

# Install rsync if needed (optional)
RUN apk add --no-cache rsync

# Expose the internal port (container)
EXPOSE 3000

# Start Next.js server binding to 0.0.0.0
CMD ["npm", "start"]