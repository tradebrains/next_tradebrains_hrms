# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

# Copy dependency files first (for better cache)
COPY package*.json ./

# Install dependencies using clean, reproducible method
RUN npm ci

# Copy all source code
COPY . .

# Build the Next.js app
RUN npm run build


# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the port Next.js listens on
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
