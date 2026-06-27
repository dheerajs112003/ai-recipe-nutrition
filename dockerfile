# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .
RUN npm install &&  npm run build

# Production Stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]