FROM node:16.18.0-alpine

WORKDIR /app

RUN npm install --global serve

COPY ./dist ./dist