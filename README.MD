# Multiplayer game server

WebGL 3D hacking game

Client: https://github.com/oslavdev/multiplayer-shooter-client

## Tech

- Node.js 
- Docker
- GraphQL
- PostgreSQL
- Ably (realtime communication)
- Prisma
- Nexus

### Development mode
```bash
yarn run dev
```

### Migration
```bash
npx prisma migrate dev --name init --preview-feature
```
