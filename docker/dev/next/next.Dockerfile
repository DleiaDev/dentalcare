
ARG NODE_VERSION=20.15.0
FROM node:${NODE_VERSION}-slim AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  # Prisma needs openssl
  openssl \
  # Clean
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install pnpm
ARG PNPM_VERSION=9.4.0
RUN npm install -g pnpm@$PNPM_VERSION

USER node

WORKDIR /app

# Install node modules
COPY --chown=node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy application code
COPY --chown=node . .

# Generate client
RUN pnpx prisma generate

EXPOSE 3000

# Start dev server
CMD ["pnpm", "dev"]
