# ---- Build stage ----
FROM node:20 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy ALL source (root index.ts + src/)
COPY . .

# Compile TS → dist/
RUN npm run build

# ---- Runtime stage ----
FROM node:20-slim AS runtime

WORKDIR /app

# Install only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled JS
COPY --from=builder /app/dist ./dist

# ---- Accept secrets as build args ----
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG DATABASE_URL
ARG S3_BUCKET_NAME

# ---- Set them as runtime env vars ----
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION
ENV DATABASE_URL=$DATABASE_URL
ENV S3_BUCKET_NAME=$S3_BUCKET_NAME

EXPOSE 3002

CMD ["node", "dist/index.js"]
