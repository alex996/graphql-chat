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

## Testing

1. `jest` + `ts-jest` & [`@shelf/jest-mongodb`](https://jestjs.io/docs/en/mongodb) presets

```js
// jest.config.js
module.exports = merge.recursive(ts, mongo, { ... })
```

- parallel, but doesn't expose options for a one-time global setup
  - `globalSetup`/`globalTeardown` run in separate processes (can't share `global` vars)
  - `setupFiles`/`setupFilesAfterEnv` run for **each** test file (one mongod process per file (!))
- requires `mongodb-memory-server` with a mongod binary (70+ MB) which needs to be cached in CI
- could run a `pretest` script, but `posttest` is not guaranteed to be reached
- could make it work with a [custom `testEnvironment`](https://github.com/facebook/jest/issues/3832#issuecomment-375544901) (see [this](https://itnext.io/parallel-testing-a-graphql-server-with-jest-44e206f3e7d2))

2. `mocha` + `ts-node` + `mongodb-memory-server`

```sh
mocha -r ts-node/register src/**/__tests__/*.ts
```

- sequential, but allows for a one-time [global setup/teardown](https://github.com/mochajs/mocha/issues/1460#issuecomment-93862610)
- cannot require [`.d.ts` files](https://github.com/TypeStrong/ts-node/issues/797), so can't declare global funcs
- poor linting, `"plugin:mocha/recommended"` doesn't work, use `"env": ["mocha": true]`

3. `apollo-server-testing`

- doesn't respect `express` middleware (and thus `express-session`, thus no auth
