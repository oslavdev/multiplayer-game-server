FROM node:12-alpine

WORKDIR /app/server

COPY ./package.json ./

RUN yarn

COPY ./ ./

RUN ls

# Run in development mode
CMD [ "yarn", "run", "dev" ]
