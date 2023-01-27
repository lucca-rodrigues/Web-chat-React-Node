FROM node:16-buster-slim AS build

WORKDIR /app

COPY . .

RUN yarn

RUN yarn start

EXPOSE 3333

