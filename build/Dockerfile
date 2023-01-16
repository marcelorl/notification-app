FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY packages packages

RUN npm i -g pnpm

RUN pnpm install

ENTRYPOINT pnpm start:dev