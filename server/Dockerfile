# Development stage
FROM node:alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]

# Production stage
FROM node:alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["npm", "start"]