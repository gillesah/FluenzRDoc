# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Copy the entire .output directory from builder
COPY --from=builder /app/.output /app/.output

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3007
ENV NODE_ENV=production

# Expose port
EXPOSE 3007

# Start the application
CMD ["node", "/app/.output/server/index.mjs"]