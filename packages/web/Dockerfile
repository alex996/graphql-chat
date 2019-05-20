FROM node:12-alpine AS node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=node /usr/src/app/dist/ /usr/share/nginx/html

COPY proxy.conf /etc/nginx/conf.d/default.conf
