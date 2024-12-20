const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime');

const requestListener = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (parsedUrl.pathname === '/') {


        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Strona główna');

    } else if (parsedUrl.pathname === '/json') {

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const jsonResponse = {
            message: 'To jest przykładowy dokument JSON',
            data: [1, 2, 3, 4],
            status: 'sukces'
        };
        res.end(JSON.stringify(jsonResponse));

    } else if (parsedUrl.pathname === '/html') {


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

    } else if (parsedUrl.pathname === '/html-file') {


        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Błąd serwera: Nie można odczytać pliku HTML.');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });

    } else if (parsedUrl.pathname === '/get_params') {


        const queryParams = parsedUrl.query;
        console.log('Otrzymane parametry:', queryParams);

        const timestamp = Date.now();
        const fileName = `params_${timestamp}.json`;
        const filePath = path.join(__dirname, fileName);


        fs.writeFile(filePath, JSON.stringify(queryParams, null, 2), (err) => {

            if (err) {


                console.error('Błąd podczas zapisu pliku:', err);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Błąd serwera' }));

            } else {


                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ ok: 'ok' }));

            }
        });

    } else {
        const filePath = path.join(__dirname, 'assets', pathname);

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(JSON.stringify({ error: "Plik nie znaleziony" }));
            } else {
                const mimeType = mime.getType(filePath);
                res.writeHead(200, { 'Content-Type': mimeType });

                fs.createReadStream(filePath).pipe(res);
            }
        });
    }
};


const server = http.createServer(requestListener);


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});