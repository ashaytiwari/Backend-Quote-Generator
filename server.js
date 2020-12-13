const express = require('express');
const bodyParser = require('body-parser');
const { ReplSet } = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const app = express();

// Mongo DB connection
MongoClient.connect('mongodb+srv://ashay:Gauranitai@123@cluster0.berue.mongodb.net/BACKEND QUOTE GENERATOR?retryWrites=true&w=majority',
    { useUnifiedTopology: true })
    .then(client => {
        console.log('Database Connected');
        const db = client.db('BACKEND-QUOTE-GENERATOR');
        const quotesCollection = db.collection('quotes');

        // Usimg EJS Template Engine
        app.set('view engine', 'ejs');

        // make server will accepting the json
        app.use(bodyParser.json());

        // Main.js script file
        app.use(express.static('public'));

        // Make sure you place body-parser before your CRUD handlers!
        app.use(bodyParser.urlencoded({ extended: true }));

        // CRUD:- Read operation
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results });
                })
                .catch(err => {
                    console.error(err);
                });

        });

        // CRUD:- Post operation
        app.post('/quotes', (req, res) => {

            // Inserting req.body in MongoDb
            quotesCollection.insertOne(req.body)
                .then(result => {
                    // Browser redirect back to same page
                    res.redirect('/');
                })
                .catch(err => {
                    console.error(err);
                })
        })

        // CRUD:- Update operation
        app.put('/quotes', (req, res) => {
            console.log(req.body.index);
            quotesCollection.findOneAndUpdate(
                { name: "Srila Prabhupad" },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote,
                        index: req.body.index
                    }
                },
                {
                    upsert: true
                }
            )
            .then(result => {
                res.json('Success');
            })
            .catch(err => {
                console.error(err);
            })
        })

        // CRUD:- Delete operation
        // app.delete('/quotes', (req, res) => {
        //     quotesCollection.deleteOne(
        //         {id: req.body.index}
        //     )
        //     .then(result => {
        //         res.json('Quote Deleted');
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     })
        // })

        // Listening to port 3000 
        app.listen(3000, () => {
            console.log("You'r app is running on Port 3000");
        })
    })
    .catch(err => {
        console.error(err);
    })




