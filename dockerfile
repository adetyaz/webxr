# Install dependencies only when needed
FROM node:18-alpine AS deps

# Install libc6-compat if needed
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies with yarn
RUN yarn install

RUN yarn cache clean

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Optional: Disable Next.js telemetry during the build
# ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application with yarn
RUN yarn build

# Production image, copy all the files and run Next.js
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Optional: Disable telemetry during runtime
# ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files for production
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ensure permissions for the public directory
RUN chmod -R 777 ./public

USER nextjs

# Expose port and set it in environment
EXPOSE 3000
ENV PORT 3000

# Run the server
CMD ["node", "server.js"]
