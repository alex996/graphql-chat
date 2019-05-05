# graphql-chat

> Note, this project is under construction :construction: I will resume the [YouTube series](https://www.youtube.com/watch?v=HKqbBrl_fKc&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv) once it's ready. Until then, you can check the code for the playlist in the [stable](https://github.com/alex996/graphql-chat/tree/stable) branch.

GraphQL chat API & UI monorepo.

## MVP

As a user, I can

- sign up / sign in / sign out / reset pwd
- start a private chat with user(s)
- invite users to a chat / leave a chat
- send messages to other user(s)
- see incoming messages live
- upload files (images, video, text)
- maintain privacy (can't read others chats/msgs)

## Next Phase

As a user, I can

- receive confirmation emails
- edit my profile
- start a public group chat
- see typing indicator
- customize the theme
- upload code snippets

## Stack

### BE

- Node + Express
- Passport + express-session + Redis
- GraphQL + Apollo Server + WS
- MongoDB + Mongoose

### FE

- React 16.8+
- Apollo Client
- Material-UI / Bulma

### DevOps

- nginx
- Docker

## Architecture

TODO

- deployment
- scaling
- security

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
