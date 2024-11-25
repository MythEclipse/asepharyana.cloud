# Base image
FROM node:20-alpine AS base

# Deps stage: install dependencies
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy over package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN pnpm prisma generate

# Build stage: build the Next.js app
# Use the deps stage as the base for builder to ensure pnpm is available
FROM deps AS builder
WORKDIR /app

COPY . .

RUN pnpm run build

# Runner stage: set up the production environment
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Create .next directory and set permissions
RUN mkdir .next
RUN chown -R nextjs:nodejs .next

# Copy build output and set permissions
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to `nextjs`
USER nextjs

# Expose port and define startup command
EXPOSE 3090
ENV PORT 3090

CMD HOSTNAME="0.0.0.0" node server.js
