const { dbConnection } = require('../models/dbConnection');

const UserService = {
    getAllUsers: (res) => {
        dbConnection.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(results));
            }
        });
    },
    createUser: (req, res) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const userData = JSON.parse(body);

            // Generate a unique ID
            const userId = Math.random().toString(36).substring(2, 15);

            // Insert the user into the database
            dbConnection.query(
                'INSERT INTO users (id, name, email, password, subject) VALUES (?, ?, ?, ?, ?)',
                [userId, userData.name, userData.email, userData.password, userData.subject],
                (err) => {
                    if (err) {
                        console.error('Error inserting user into database:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ id: userId }));
                    }
                }
            );
        });
    },
    deleteUser: (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const userId = url.searchParams.get('id');

        if (!userId) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: User ID is missing');
            return;
        }

        dbConnection.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
            if (err) {
                console.error('Error deleting user from database:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(204);
                res.end();
                console.log("Number of records deleted: " + result.affectedRows);
            }
        });
    },
    getUserById: (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const userId = url.searchParams.get('id');

        if (!userId) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: User ID is missing');
            return;
        }

        dbConnection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else if (results.length === 0) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found: User not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(results[0]));
            }
        });
    }
};

module.exports = { UserService };
