const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//Routes

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/o-nas', (req, res) => {
    res.render('about');
});

app.get('/oferta', (req, res) => {
    res.render('services');
});

app.get('/kontakt', (req, res) => {
    res.render('contact');
});

app.post('/kontakt', (req, res) => {
    console.log(req.body);
    res.redirect('/');

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running port: ${PORT}`);
});
