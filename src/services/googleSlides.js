const authorize = require('../auth/google/authorize');
const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const slideConverter = require('./gSlideConverter');

let subData = {};
let slideData = [];

/**
 * Google Slides subpart
 */
module.exports = {
    newPresentation: function (presentation) {
        init(presentation);
        return "Slides created.";
    },
};

// Load client secrets from a local file.
function init(presentation) {
    //REMOVE ME, test data for slides
    subData = presentation.subreddit;
    slideData = presentation.slides ? presentation.slides : [{title: "Titel", content: {text: "Body Text"}, author: "Autor", layout: "BLANK"}];

    fs.readFile('src/auth/google/client_secret.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Slides API.
        authorize(JSON.parse(content), buildSlides);
    });

    return "slides created.";
}

function buildSlides(auth) {
    
    const slides = google.slides({
        version: 'v1',
        auth
    });

    //create a new presentation
    slides.presentations.create({
        title: "" + Date.now()
    }, (err, presentation) => {
        if (err) {
            console.log(err);
        }
        console.log('präsi', presentation.data.slides[0].slideProperties);
        generateSlides(presentation.data.presentationId);
        console.log(`Created Presentation: https://docs.google.com/presentation/d/${presentation.data.presentationId}`);
    });

    //build the slides

    let request = [];
    request = request.concat(slideConverter.buildTitlePage(subData)).concat(slideConverter.build(slideData));

    function generateSlides(presentationId) {
        slides.presentations.batchUpdate({
            presentationId: presentationId,
            resource: {
                requests: request
            }
        }, function (err, createSlideResponse) {
            if (err) {
                console.log(err);
            }
        });
    }
}
