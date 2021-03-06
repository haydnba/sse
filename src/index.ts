import Fastify from 'fastify';
import cors from 'fastify-cors';
import routes from './routes';
import { sse, sqlite } from './plugins';

const server = Fastify({
  logger: true,
});

server.register(cors, {
  origin: '*',
  methods: 'OPTIONS, GET',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: 'Authorization',
});

server.register(sse);
server.register(sqlite);
server.register(routes);

void (async function () {
  try {
    await server.listen(8080);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
