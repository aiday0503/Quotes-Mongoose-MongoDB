// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quote: { type: String, required: true }
}, { timestamps: true });

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote')


app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
})

app.post('/quotes', function(req, res) {
    var quote = new Quote({ name: req.body.name, quote: req.body.quote });
    quote.save(function(err) {
        if (err) {
            res.render('index', { errors: quote.errors })
        } else {
            res.redirect('/quotes');
        }
    });
})
app.get('/quotes', function(req, res) {
        Quote.find(function(err, quote) {
            if (err) {
                console.log(err)
            }
            res.render('quotes', { quotes: quote });
        });
    })
    //maybe this mistake(top)

app.listen(8000, function() {
    console.log("listening on port 8000");
})