
ARG NODE_VERSION=24.16.0
FROM node:$NODE_VERSION-slim AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  # Prisma needs openssl
  openssl \
  # Clean
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install pnpm
# Upgrade corepack first: older bundled versions ship stale npm signing keys
RUN npm install -g corepack@latest && corepack enable

# Create /app as root and hand it to node, since WORKDIR creates it as root
# under the classic builder
RUN mkdir /app && chown node:node /app

USER node

WORKDIR /app

# Install node modules
COPY --chown=node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Copy application code
COPY --chown=node . .

# Generate client
RUN pnpm prisma generate

EXPOSE 3000

# Start dev server
CMD ["pnpm", "dev"]
