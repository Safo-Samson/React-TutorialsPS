const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,POST',
    })
);
server.options('https://3000-rpamul-reactjslab-hu8us6j5tmp.ws-eu101.gitpod.io', cors());

server.use(middlewares);
server.use(router);
server.listen(4000, () => {
    console.log('JSON Server is running');
});