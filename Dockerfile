# === Stage 1: Build Stage ===
# Use a Debian-based Node.js image for better compatibility with native modules
# UPDATED: Changed from node:20 to node:22 to meet package requirements
FROM node:22-bookworm AS builder

# Set the working directory inside the container
WORKDIR /app

<<<<<<< HEAD
# --- FIX: Install all necessary system dependencies for building native modules ---
# This now includes python3 and specific libraries for the 'canvas' package.
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm git python3 cairo-dev jpeg-dev pango-dev giflib-dev
=======
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
>>>>>>> 708c6db514cedd1958c68dd485517bff18de47e8

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install all dependencies, including devDependencies needed for the build
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Build the Next.js application for production
RUN npm run build


# === Stage 2: Production Stage ===
# Start from a fresh, lightweight Debian-based Node.js image
# UPDATED: Changed from node:20 to node:22
FROM node:22-bookworm-slim AS runner

WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Install only the necessary production system dependencies
<<<<<<< HEAD
# Ghostscript is required by the 'pdf2pic' library for PDF to Image conversion.
RUN apk add --no-cache ghostscript cairo pango jpeg giflib
=======
# Ghostscript is required for PDF to Image conversion.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ghostscript \
    libcairo2 \
    libpango-1.0-0 \
    libjpeg62-turbo \
    libgif7
>>>>>>> 708c6db514cedd1958c68dd485517bff18de47e8

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
