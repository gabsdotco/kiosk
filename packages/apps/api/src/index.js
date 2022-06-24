const jsonServer = require('json-server');
const path = require('path');

const PORT = process.env.PORT || 8080;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`API Running on port ${PORT}!`);
});
