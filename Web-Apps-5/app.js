const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact_db',
})

db.connect(err => {
    if (err){
        console.error("Database connection error:", err)
    }else{
        console.log("Database connection success");
    }
})
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

    const { firstName, lastName, email, message } = req.body;

    const query = 'INSERT INTO messages (firstName, lastName, email, message) VALUES (?,?,?,?)'

    db.query(query, [firstName, lastName, email, message],
        (err, result) => {
        if (err){
            console.error('Error while creating message', err);
            res.status(500).send('Server error');
        }else{
            console.log('Successfully created message', result.insertId);
            res.redirect('/')
        }
        })
    // console.log(req.body);
    //
    // res.redirect('/');

});

app.get('/api/contact-messages', (req, res) => {
    const query = 'SELECT * FROM messages';
    db.query(query, (err, results) => {
        if (err){
            console.error('Error while retriving data', err);
            res.status(500).send('Server error');
        }else{
            res.json(results);
        }
    })
})

app.get('/api/messages/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM messages WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err){
            console.error('Error while retriving data', err);
            res.status(500).send('Server error');
        }else if(results.length === 0){
            res.status(404).send('No record found');
        }else{
            res.json(results[0]);
        }
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running port: ${PORT}`);
});
