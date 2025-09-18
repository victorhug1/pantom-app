FROM node:18-bullseye AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-bullseye AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app ./
RUN npm prune --omit=dev
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=5 CMD curl -f http://localhost:3000/ || exit 1
CMD ["npm","run","start"]