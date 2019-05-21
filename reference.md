# Reference

## Lerna

```sh
# Init. an indep. versioned monorepo
npx lerna init --independent

# Create a scoped package
npx lerna create @graphql-chat/api --private

# Install a dev dep to a package
npx lerna add nodemon --scope=@graphql-chat/api --dev

# Install deps across packages
npx lerna bootstrap --hoist

# Run watch script across packages
npx lerna run --parallel watch
```

## MongoDB

```sh
# Start a container in the background on port 27017 with 'root' user on the 'admin' database
docker run -d --name mongodb -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

# Run the mongo CLI client as 'root' against 'admin' database and connect to 'chat'
docker exec -it mongodb mongo -u root -p secret --authenticationDatabase admin chat

# Inside the client, create an admin user for the 'chat' database
db.createUser({
  user: 'admin', pwd: 'secret', roles: ['readWrite', 'dbAdmin']
})

# Verify that you can connect to mongo through the exposed port on your host machine
curl 127.0.0.1:27017
# It looks like you are trying to access MongoDB over HTTP on the native driver port.

# Connect as admin
docker exec -it mongodb mongo -u admin -p secret chat
```

## Redis

```sh
docker run -d --name redisdb -p 6379:6379 redis redis-server --requirepass secret

docker exec -it redisdb redis-cli -a secret
```

## Docker

```sh
# Build a container, tag with a name
docker build -t chat-api .

# Run a container in detached mode
docker run -d -p 3000:3000 chat-api

# SSH into the container
docker exec -it chat-api sh

# Remove dangling images
docker rmi $(docker images --quiet --filter "dangling=true")

# Remove stopped containers
docker rm $(docker ps -a -q)
```

## docker-compose

- [CLI ref](https://docs.docker.com/compose/reference/overview/)
- [environment vars](https://docs.docker.com/compose/environment-variables/)
- basic [node.js guide](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- specific services `docker-compose up chat-db chat-cache`
- start & rebuild `docker-compose up --build`

## Docker best practices

> See [this](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md) and [this](https://docs.docker.com/v17.09/engine/userguide/eng-image/dockerfile_best-practices/)

- Run node with `USER node` instead of `root`
- Use `FROM node:alpine` base image
- Don't map `node_modules` volume to your container
  - local `node_modules` may contain OS-specific (Mac, Windows) binaries
- Make sure to pass environment vars, not shell vars
  - use `export` and not simply `source .env` or `. .env` (see [this](https://forums.docker.com/t/docker-compose-not-seeing-environment-variables-on-the-host/11837/3))
    - otherwise, make sure to use `set -a` (see [this](https://stackoverflow.com/a/33186458))
  - `echo $DB_USERNAME` vs. `printenv | grep DB_USERNAME` (see [this](https://github.com/docker/compose/issues/4189#issuecomment-320362242))
- Make env vars configurable
  - e.g. [mongo](https://github.com/docker-library/mongo/issues/257#issuecomment-375747688) or [redis](https://github.com/docker-library/redis/issues/46#issuecomment-363117342)

## Nginx

- [basic setup](https://gist.github.com/soheilhy/8b94347ff8336d971ad0)
