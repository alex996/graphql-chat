# Real-time Chat App (WIP)

> **Note**: this project is in active development. Your suggestions are welcome!

Built with MERN + GraphQL.

## Index

- [Features](#features)
- [Technologies](#technologies)
- [Schema](#schema)
- [MongoDB Dev Setup with Docker](#mongodb-dev-setup-with-docker)

## Features

* sign up / sign in / reset password (?)

* direct messaging (1 on 1)

* private group chat (2+ users)

* channels (public / private / favorite) & teams (?)

* avatar upload in user profile

* typing indicator, edit messages, user status (logged in / out / inactive)

* respond to comments (like, quote, emoji, favorite) (?)

* file sharing (img, text, video (?))

* social login (Google, FB, GitHub, etc)

* RWD + mobile first

* chat bot (?)

* notifications

* emails (confirm registration, reset password, etc.) (?)

* lazy loading, persisted queries, Apollo Engine

* switch themes

* unit testing

* markdown, code snippets (?)

* deployment to a cloud host (AWS, Heroku, Zeit, or other)

* production (scalability, security, performance, etc.)

* CI/CD

* 12 factor app (?)

## Technologies

* Apollo Server v2

* Apollo Client v2

* Mongoose ORM

* Web Sockets

* JWT auth

* Gravatar (?)

* ES 2015/16/17 + Babel, Webpack, Nodemon, Reload

## Schema

### User

```
  Field      |  Type        |  Options
  -----------------------------------------------
  _id        |  ObjectId    |
  name       |  String      |  required
  email      |  String      |  required, unique
  password   |  String      |  required
  avatarUrl  |  String      |
  chats      |  [ObjectId]  |
  createdAt  |  Date        |
  updatedAt  |  Date        |
```

### Chat

```
  Field      |  Type        | Options
  -------------------------------------
  _id        |  ObjectId    |
  name       |  String      |
  users      |  [ObjectId]  |
  messages   |  [ObjectId]  |
  createdAt  |  Date        |
  updatedAt  |  Date        |
```

### Message

```
  Field      |  Type        |  Options
  --------------------------------------
  _id        |  ObjectId    |
  body       |  String      |  required
  user       |  ObjectId    |
  createdAt  |  Date        |
  updatedAt  |  Date        |
```

## MongoDB Dev Setup with Docker

> **Note**: you are free to use a cloud provider, such as mLab or Atlas, instead.

```sh
# Start a MongoDB container in the background on port 27017 and create a 'root' user on the 'admin' database
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

# Run the mongo CLI client on the container as 'root' against 'admin' database and connect to 'chat'
docker exec -it mongodb mongo -u root -p secret --authenticationDatabase admin chat

# Inside the client, create an admin user for the 'chat' database
db.createUser({
  user: 'admin', pwd: 'secret', roles: ['readWrite', 'dbAdmin']
})

# Verify that you can connect to mongo through the exposed port on your host machine
curl 127.0.0.1:27017
# It looks like you are trying to access MongoDB over HTTP on the native driver port.
```
