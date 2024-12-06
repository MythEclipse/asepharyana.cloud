# Base image
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Deps stage: install dependencies
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy Prisma schema and generate Prisma Client
COPY prisma ./prisma
RUN pnpm prisma generate

# Build stage: build the Next.js app
FROM base AS build
WORKDIR /app

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Runner stage: set up the production environment
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

# Expose port and define startup command
EXPOSE 3090
ENV PORT 3090

CMD ["pnpm", "run", "start"]
