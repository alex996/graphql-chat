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
```

## Redis

```sh
docker run -d --name redisdb -p 6379:6379 redis redis-server --requirepass secret

docker exec -it redisdb redis-cli -a secret
```

## Docker

```sh
docker build -t gql-chat-api .

docker run -d -p 3000:3000 gql-chat-api
```
