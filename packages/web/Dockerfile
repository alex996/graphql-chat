FROM node:12-alpine AS node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY --from=node /app/dist/ /usr/share/nginx/html

COPY proxy.conf /etc/nginx/conf.d/default.conf
