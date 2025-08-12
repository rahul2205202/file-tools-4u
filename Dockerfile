# === Stage 1: Build Stage ===
# Use a Debian-based Node.js image for better compatibility with native modules
# UPDATED: Changed from node:20 to node:22 to meet package requirements
FROM node:22-bookworm AS builder

# Set the working directory inside the container
WORKDIR /app

# --- FIX: Install all necessary system dependencies for building native modules using apt-get ---
# This includes build-essential (for C++ compilers), python3, and libraries for the 'canvas' package.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    libcairo2-dev \
    libjpeg62-turbo-dev \
    libpango1.0-dev \
    libgif-dev \
    g++

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install all dependencies, including devDependencies needed for the build
RUN npm install

# --- FIX: Accept build arguments for secrets and set them as environment variables ---
# This is crucial for making the API key available to `npm run build`
ARG RESEND_API_KEY
ARG GEMINI_API_KEY
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Copy the rest of your application code into the container
COPY . .

# Build the Next.js application for production
# This command now has access to the environment variables set above
RUN npm run build


# === Stage 2: Production Stage ===
# Start from a fresh, lightweight Debian-based Node.js image
# UPDATED: Changed from node:20 to node:22
FROM node:22-bookworm-slim AS runner

WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Install only the necessary production system dependencies
# Ghostscript is required for PDF to Image conversion.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ghostscript \
    libcairo2 \
    libpango-1.0-0 \
    libjpeg62-turbo \
    libgif7

# Create a non-root user for better security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built application from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set the owner of the working directory to the new user
USER nextjs

# Expose the port that Next.js will run on (default is 3000)
EXPOSE 3000

# The command to start the Next.js production server
CMD ["npm", "start"]