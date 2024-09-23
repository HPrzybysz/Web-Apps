const http = require('http')
const fs = require('fs');
const path = require('path');
const  url = require('url');

const requestListener = (req, res) => {
    const url = req.url;
    const parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (url === '/1') {
        // Strona główna
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Strona główna');
    } else if (url === '/2') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const jsonResponse = {
            name: "John Doe",
            city: "Radom",
            state: "powodz"
        };
        res.end(JSON.stringify(jsonResponse));
    } else if (url === '/3') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Strona</title>
            </head>
            <body>
                <h1>Styrta sie pali</h1>
                <p>Łączna 43</p>
            </body>
            </html>
        `);
    } else if (url === '/4') {
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
    } else if(url === '/get_params'){
        const queryParams = parsedUrl.query();
        console.log(queryParams);
        const timestamp = Date().now();
        const fileName = `params/${timestamp}.json`;
        const filePath = path.join(__dirname, fileName);

        fs.writeFile(filePath, JSON.stringify(requestListener(queryParams, null, 2), (err) =>{
            if (err) {
                console.log("blad", err);
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(JSON.stringify({error: 'blad serwera'}));
            }else {
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(JSON.stringify({ok: 'ok'}));
            }
        }));

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