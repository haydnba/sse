import * as crypto from 'crypto';

function randomString(length = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

function* generateSequence() {
  while (Math.round(Math.random() * 100) > 10) {
    yield { data: randomString() };
  }
}

function sseHandler(_request, reply) {
  reply.sse(generateSequence());
}

function pongHandler(_request, reply) {
  reply.send('pong\n');
}

async function routes(server, _options) {
  server.get('/sse/:id', sseHandler);
  server.get('/ping', pongHandler);
}

export default routes;
