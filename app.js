var express = require('express')
var reddit = require('./reddit')
var slides = require('./slides')
var app = express()
const https = require('https')

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello whack!')
})

app.get('/reddit/', function (req, res) {
    res.send(reddit.get())
})

app.get('/slides/', function (req, res) {
    res.send(slides.createSlides())
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))