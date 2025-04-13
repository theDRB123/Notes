FROM node:23-slim AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]
