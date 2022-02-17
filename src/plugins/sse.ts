import * as stream from 'stream';
import fp from 'fastify-plugin';

// ['data', 'event', 'id', 'retry']

async function* serialize(input: any) {
  for await (const message of input) {
    const result = Object.keys(message).reduce((payload, param) => {
      payload += `${param}: ${message[param]}\n`;
      return payload;
    }, '');

    console.log(result);

    yield result + '\n';
  }
}

async function sse(server, _options): Promise<void> {
  const headers: { [key: string]: string | number } = {};

  headers['Access-Control-Allow-Origin'] = '*';
  headers['Cache-Control'] = 'no-cache,no-transform';
  headers['Connection'] = 'keep-alive';
  headers['Content-Type'] = 'text/event-stream';
  headers['x-no-compression'] = 1;

  async function handler(source: Generator): Promise<void> {
    this.raw.writeHead(200, headers);
    const data = stream.Readable.from(serialize(source));
    data.pipe(this.raw);
  }

  server.decorateReply('sse', handler);
}

export default fp(sse);
