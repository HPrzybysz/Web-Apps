const http = require('http')
const fs = require('fs');
const path = require('path');

const requestListener = (req, res) => {
    const url = req.url;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (url === '/') {
        // Strona główna
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Strona główna');
    } else if (url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const jsonResponse = {
            message: 'JSON',
            data: [1, 2, 3, 4],
            status: 'sukces'
        };
        res.end(JSON.stringify(jsonResponse));
    } else if (url === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>HTML</title>
            </head>
            <body>
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consequuntur culpa cum eius et in quasi qui voluptate. Commodi iste officia recusandae rem suscipit tempore. Ab distinctio facilis iste nostrum!</p>
            </body>
            </html>
        `);
    } else if (url === '/html-file') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Błąd serwera');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404: Strona nie znaleziona');
    }
};

const server = http.createServer(requestListener);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});