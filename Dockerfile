# Stage 1: Base image
FROM node:20-alpine AS base
WORKDIR /app

# Create a 'nextjs' user explicitly in the base image
RUN adduser -D nextjs

# Stage 2: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./ 
RUN \
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm install --legacy-peer-deps; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Stage 3: Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN npx prisma generate && mkdir -p /app/node_modules/.prisma && \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Build script not found." && exit 1; \
    fi

# Stage 4: Runner
FROM base AS runner
# Copy over necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/prisma ./prisma
RUN mkdir -p ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nextjs /app/node_modules/.prisma/ ./node_modules/.prisma/

# Switch to the 'nextjs' user
USER nextjs
EXPOSE 3090
CMD ["node", "server.js"]
