const express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const BookSchema = require("./bookSchema");

const app = express();
const port = 3000;
let db;


app.use(bodyParser.urlencoded({encode: true, extended: true}));

MongoClient.connect('mongodb://haniarudy:ainah@ds149030.mlab.com:49030/book', (err, res) => {
    if(err) {
        return console.log(err);
    }
    db = res;
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}`);
    });
});

app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/index.html')
});

app.post('/titles', (req, res) => {
    const book = new BookSchema;
    book.title = req.body.title;
    book.description = req.body.description;

    db.collection('book')
        .save(book, (err, result) => {
        if (err) {
            return console.error(err)
        }

        console.info("Saved to database");
        res.redirect("/")
    })
 });
