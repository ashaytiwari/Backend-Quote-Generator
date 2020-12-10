const express = require('express');
const bodyParser = require('body-parser');
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

        // Make sure you place body-parser before your CRUD handlers!
        app.use(bodyParser.urlencoded({ extended: true }));

        // CRUD:- Read operation
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
            .then(results => {
                res.render('index.ejs', {quotes: results});
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
                windows.alert('Quote Submitted Successfully');
                res.redirect('/');
            })
            .catch(err => {
                console.error(err);
            })
        })

        // Listening to port 3000 
        app.listen(3000, () => {
            console.log("You'r app is running on Port 3001");
        })
    })
    .catch(err => {
        console.error(err);
    })




