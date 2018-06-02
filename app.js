const express = require('express');

const home = require('./home');
const reddit = require('./reddit');
const slides = require('./slides');
const createRandomPerson = require('./createRandomPerson');
const Person = require('./entities/Person');
const Slide = require('./entities/slide');

const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send(home.get());

    let slide = new Slide();
    slide.title = 'Hello';
    slide.content.text = 'Whack';
    console.log(slide);
});

app.get('/reddit/', function (req, res) {
    res.send(reddit.get());
});

app.get('/reddit/auth', function (req, res) {
    res.send(reddit.auth());
});

app.get('/reddit/r/:sub' , function (req, res) {
    res.send(reddit.subreddit(req.params.sub).then(slides => console.log(slides)));
});

app.get('/slides/', function (req, res) {
    res.send(slides.newPresentation())
});

app.get('/person/', function (req, res) {
    res.send(createRandomPerson.get())
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
