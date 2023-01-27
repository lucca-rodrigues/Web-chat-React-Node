FROM node:16-buster-slim AS build

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 3333


CMD [ "yarn", "start", "--hot" ]