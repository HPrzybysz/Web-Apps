const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Dynamiczny HTML</title>
            </head>
            <body>
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consequuntur culpa cum eius et in quasi qui voluptate. Commodi iste officia recusandae rem suscipit tempore. Ab distinctio facilis iste nostrum!</p>
            </body>
            </html>
        `);
})

module.exports = router;