const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    // const filePath = path.join(__dirname, 'views/htmlin.html');
    fs.readFile('views/htmlin.html', 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Błąd serwera: Nie można odczytać pliku HTML.');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
    });
})

module.exports = router;