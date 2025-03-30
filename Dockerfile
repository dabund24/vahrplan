FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN rm -rf src/ static/ docker-compose.yml

EXPOSE 3000

USER node:node

CMD ["npm", "start"]