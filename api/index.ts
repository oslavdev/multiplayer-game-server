import { apolloServer } from './server';
import express from 'express';

const server = async () => {
  const app = await express();

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}/`);
  });
};

server().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
