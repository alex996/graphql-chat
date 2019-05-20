FROM node:12-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --only=production

COPY . .

USER node

CMD ["node", "-r", "esm", "index.js"]
