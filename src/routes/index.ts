import * as crypto from 'crypto';
import * as stream from 'stream';

/**
 *
 */
function sseHandler(_request, reply) {
  reply.raw.setHeader('Access-Control-Allow-Origin', '*');
  reply.raw.setHeader('Cache-Control', 'no-cache,no-transform');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.setHeader('Content-Type', 'text/event-stream');
  reply.raw.setHeader('x-no-compression', 1);
  reply.raw.writeHead(200);

  const data = new stream.Readable({
    read() {
      this.push('data: ' + crypto.randomBytes(64).toString('hex') + '\n\n');
      Math.round(Math.random()) && this.push(null);
    },
  });

  data.pipe(reply.raw);
}

async function routes(server, _options) {
  /**
   *
   */
  server.get('/sse/:id', sseHandler);

  /**
   *
   */
  server.get('/ping', () => 'pong\n');
}

export { routes };