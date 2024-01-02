const { UserController } = require('./userController');

const appController = {
    handleRequest: (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);

        // Your existing code for CORS headers

        switch (url.pathname) {
            case '/api/users':
                UserController.handleUserRequest(req, res);
                break;
            case '/api/users/delete':
                UserController.handleDeleteUser(req, res);
                break;
            case '/api/users/find':
                UserController.handleFindUser(req, res);
                break;
            default:
                // Handle other paths
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
        }
    }
};

module.exports = { appController };
