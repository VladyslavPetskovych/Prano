# Development stage
FROM node:20-slim AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-slim AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

CMD ["npm", "start"]
