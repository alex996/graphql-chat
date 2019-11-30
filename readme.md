# graphql-chat

> Note, this project is under construction :construction: I will resume the [YouTube series](https://www.youtube.com/watch?v=HKqbBrl_fKc&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv) once it's ready. Until then, you can check the code for the playlist in the [stable](https://github.com/alex996/graphql-chat/tree/stable) branch.

GraphQL chat API & UI monorepo.

## Setup

### Dev

```sh
# (Linux) Export UID to fix permissions
export UID

# Boot the stack; this will
# - provision mongo & redis
# - launch api & web
npm run up

# Only run api & web
npm run dev

# Stop containers
npm run stop

# Tear down containers
npm run down
```

### Prod

```sh
# (Linux) Export UID to fix permissions
export UID
# (Linux) Create volume dir with current user
mkdir data

# Create env file
cp .env.example .env
# or export into shell
export $(cat /path/to/.env)

# Boot the stack
docker-compose up -d

# View logs
docker-compose logs

# Re-build api & web after changes
docker-compose build api web
```

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

- Node + Express + TS
- GraphQL + Apollo Server + WS
- express-session + Redis
- MongoDB + Mongoose

### FE

- React 16.8+
- Apollo Client
- Material-UI / Bulma

### DevOps

- nginx
- Docker + docker-compose
