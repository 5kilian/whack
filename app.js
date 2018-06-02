const express = require('express');

const home = require('./home');
const reddit = require('./reddit');
const slides = require('./slides');

const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send(home.get());
});

app.get('/reddit/', function (req, res) {
    res.send(reddit.get());
});

app.get('/reddit/auth', function (req, res) {
    res.send(reddit.auth());
});

app.get('/reddit/r/:sub' , function (req, res) {
    res.send(reddit.subreddit(req.params.sub));
});

app.get('/slides/', function (req, res) {
    res.send(slides.newPresentation())
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));