
ARG NODE_VERSION=20.15.0
FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app

# Install pnpm
ARG PNPM_VERSION=9.4.0
RUN npm install -g pnpm@$PNPM_VERSION

# Install node modules
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
