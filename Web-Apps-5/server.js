const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();



app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    fs.readFile('./sites/main.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).set('Content-Type', 'text/plain; charset=utf-8');
            res.send('Server Error');
        } else {
            res.set('Content-Type', 'text/html; charset=utf-8');
            res.send(data);
        }
    })
})
app.get('/o-nas', (req, res) => {
    fs.readFile('./sites/About.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).set('Content-Type', 'text/plain; charset=utf-8');
            res.send('Server Error');
        }   else {
            res.set('Content-Type', 'text/html');
            res.send(data);
        }
    })
})
app.get('/oferta', (req, res) => {
    fs.readFile('./sites/oferta.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).set('Content-Type', 'text/plain; charset=utf-8');
            res.send('Server Error');
        }else {
            res.set('Content-Type', 'text/html');
            res.send(data);
        }
    })
})
app.get('/kontakt', (req, res) => {
    fs.readFile('./sites/Kontakt.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).set('Content-Type', 'text/plain; charset=utf-8');
            res.send('Server Error');
        }else {
            res.set('Content-Type', 'text/html');
            res.send(data);
        }
    })
})

const PORT = 3000;
server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})