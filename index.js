const http = require('http');
const { appController } = require('./controllers/appControllers');

const PORT = 3000;

const server = http.createServer(appController.handleRequest);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});