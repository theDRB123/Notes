FROM node:23-slim AS builder

WORKDIR /app

COPY package.json .

ARG VITE_PORT
ARG VITE_HOST
ARG VITE_SERVER_URL
ENV VITE_HOST=${VITE_HOST}
ENV VITE_PORT=${VITE_PORT}
ENV VITE_SERVER_URL=${VITE_SERVER_URL}

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]