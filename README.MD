# Multiplayer game Server

> **Note** 
> This is a work in progress repo

WebGL sci-fi multiplayer game. 

Client: https://github.com/oslavdev/multiplayer-shooter-client

## Features

- Select and customize character
- Private maps
- Choose weapons
- Audio, video and written chat
- Selection of maps

## Tech

- Node.js 
- Docker
- GraphQL
- PostgreSQL
- Ably
- Prisma

## Deploy

### Build command

### Development 

Server will run on http://localhost:4000/

```bash
    yarn run dev
```

### DB Migration

```bash
    npx prisma migrate dev --name init --preview-feature
```
