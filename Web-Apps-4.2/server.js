const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const mime = require('mime');

app.use(express.json());

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.send('Strona główna');
});

app.get('/json', (req, res) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    const jsonResponse = {
        message: 'To jest przykładowy dokument JSON',
        data: [1, 2, 3, 4, 5, 21, 37],
        status: 'sukces'
    };
    res.json(jsonResponse);
});

app.get('/html', (req, res) => {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(`
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
});

app.get('/html-file', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).set('Content-Type', 'text/plain; charset=utf-8');
            res.send('Błąd serwera: Nie można odczytać pliku HTML.');
        } else {
            res.set('Content-Type', 'text/html; charset=utf-8');
            res.send(data);
        }
    });
});

app.get('/get_params', (req, res) => {
    const queryParams = req.query;
    console.log('Otrzymane parametry:', queryParams);

    const timestamp = Date.now();
    const fileName = `params_${timestamp}.json`;
    const filePath = path.join(__dirname, fileName);

    fs.writeFile(filePath, JSON.stringify(queryParams, null, 2), (err) => {
        if (err) {
            console.error('Błąd podczas zapisu pliku:', err);
            res.status(500).set('Content-Type', 'application/json; charset=utf-8');
            res.json({ error: 'Błąd serwera' });
        } else {
            res.set('Content-Type', 'application/json; charset=utf-8');
            res.json({ ok: 'ok' });
        }
    });
});

app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'assets', req.path);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.status(404).set('Content-Type', 'text/plain; charset=utf-8');
            res.json({ error: "Plik nie znaleziony" });
        } else {
            const mimeType = mime.getType(filePath);
            res.set('Content-Type', mimeType);
            fs.createReadStream(filePath).pipe(res);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});