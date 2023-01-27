FROM node:16-buster-slim AS build

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 3000


CMD [ "yarn", "start" ]