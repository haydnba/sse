import fp from 'fastify-plugin';
import * as sqlite from 'sqlite3';

// TODO
const query: string =
  'CREATE TABLE IF NOT EXISTS clients (title TEXT NOT NULL, completed INTEGER)';

async function connection(server, _options) {
  const db = new sqlite.Database('clients-db');

  db.serialize(function () {
    db.run(query);
  });

  server.decorate('sqlite', { db });
}

export default fp(connection);
