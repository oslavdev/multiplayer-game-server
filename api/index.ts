import { apolloServer } from './server';
import express from 'express';
import winston from 'winston';

const server = async () => {
  const app = await express();

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({
        filename: './logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: './logs/combined.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Game Server ready at http://localhost:${PORT}/graphql`);
  });
};

server().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
