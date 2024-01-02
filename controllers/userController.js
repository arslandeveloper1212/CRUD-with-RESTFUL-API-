const { UserService } = require('../services/userService');

const UserController = {
    handleUserRequest: (req, res) => {
        if (req.method === 'GET') {
            UserService.getAllUsers(res);
        } else if (req.method === 'POST') {
            UserService.createUser(req, res);
        }
    },
    handleDeleteUser: (req, res) => {
        UserService.deleteUser(req, res);
    },
    handleFindUser: (req, res) => {
        UserService.getUserById(req, res);
    }
};

module.exports = { UserController };
