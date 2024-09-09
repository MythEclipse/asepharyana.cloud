# Base image
FROM node:20-alpine AS base

# Accept build arguments
ARG SECRET
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
ARG GOOGLE_OAUTH_CLIENT_ID
ARG GOOGLE_OAUTH_CLIENT_SECRET
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ARG GEMINI_API
ARG NODE_ENV
ARG NEXT_PUBLIC_KOMIK
ARG NEXT_PUBLIC_ANIME
ARG NEXT_PUBLIC_BASE_URL
ARG DATABASE_URL

# Set environment variables
ENV SECRET=${SECRET}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
ENV NEXT_PUBLIC_FIREBASE_APP_ID=${NEXT_PUBLIC_FIREBASE_APP_ID}
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}
ENV GOOGLE_OAUTH_CLIENT_ID=${GOOGLE_OAUTH_CLIENT_ID}
ENV GOOGLE_OAUTH_CLIENT_SECRET=${GOOGLE_OAUTH_CLIENT_SECRET}
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
ENV GEMINI_API=${GEMINI_API}
ENV NEXT_PUBLIC_KOMIK=${NEXT_PUBLIC_KOMIK}
ENV NEXT_PUBLIC_ANIME=${NEXT_PUBLIC_ANIME}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV DATABASE_URL=${DATABASE_URL}

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
