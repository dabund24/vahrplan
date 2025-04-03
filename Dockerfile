FROM node:22-alpine

WORKDIR /app
RUN apk --no-cache add curl

COPY package*.json ./
RUN npm ci

COPY . .

RUN chmod +x scripts/line-shapes.sh
RUN /bin/sh scripts/line-shapes.sh

RUN npm run build
RUN rm -rf scripts/ src/ static/ docker-compose.yml

EXPOSE 3000

USER node:node

CMD ["npm", "start"]