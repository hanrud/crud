//Use template engine to generate html with ajax data

const express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const BookSchema = require("./bookSchema");

const app = express();
const port = 3000;
let db;


app.use(bodyParser.urlencoded({encode: true, extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.set("view engine", "ejs");

MongoClient.connect('mongodb://haniarudy:ainah@ds149030.mlab.com:49030/book', (err, res) => {
    if (err) {
        return console.log(err);
    }
    db = res;
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}`);
    });
});

app.get('/', (req, res) => {
    db.collection("book").find().toArray((err, result) => {
        res.render('index.ejs', {titles: result});
    });
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

app.put('/titles', (req, res) => {
    db.collection('book').findOneAndUpdate({
        title: "Abcd"
    }, {
        $set: {
            title: req.body.title,
            description: req.body.description
        }
    }, {
        sort: {_id: -1},
        upsert: true
    }, (err, response) => {
        if (err) {
            return res.send(err);
        }
        res.send(response);
    })
});

app.delete('/titles', (req, res) => {
    db.collection('book').findOneAndDelete({
        title: req.body.title
    }, (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    })
});