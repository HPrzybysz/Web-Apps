const express = require('express');
const fs = require('fs');
const path = require('path');
(async () => {
    const mime = await import('mime');
})();

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).send('Strona główna');
});

app.get('/json', (req, res) => {
    res.status(200).json({
        message: 'To jest przykładowy dokument JSON',
        data: [1, 2, 3, 4],
        status: 'sukces'
    });
});

app.get('/html', (req, res) => {
    res.status(200).send(`
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
});

app.get('/html-file', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Błąd serwera: Nie można odczytać pliku HTML.');
        } else {
            res.status(200).send(data);
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
            res.status(500).json({ error: 'Błąd serwera' });
        } else {
            res.status(200).json({ ok: 'ok' });
        }
    });
});

app.use(express.static(path.join(__dirname, 'assets'), {
    setHeaders: (res, filePath) => {
        const mimeType = mime.getType(filePath);
        res.setHeader('Content-Type', mimeType || 'application/octet-stream');
    }
}));

app.use((req, res) => {
    res.status(404).json({ error: 'Plik nie znaleziony' });
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
