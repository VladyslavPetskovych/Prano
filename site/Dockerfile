# Development stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=optional

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=development /app/dist /usr/share/nginx/html
