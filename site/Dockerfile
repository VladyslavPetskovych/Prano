# Development stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "dev", "--", "--host"]

# Production stage
FROM nginx:1.27.4-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=development /app/dist /usr/share/nginx/html
