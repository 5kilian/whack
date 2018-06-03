const authorize = require('../auth/google/authorize');
const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const slideConverter = require('./gSlideConverter');

let slideData = [];

/**
 * Google Slides subpart
 */
module.exports = {
    newPresentation: function (slides) {
        init(slides);
        return "Slides created.";
    },
};

// Load client secrets from a local file.
function init(slides) {
    //REMOVE ME, test data for slides
    slideData = slides ? slides : [{title: "Titel", content: {text: "Body Text"}, author: "Autor", layout: "BLANK"}];

    fs.readFile('src/auth/google/client_secret.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Slides API.
        authorize(JSON.parse(content), buildSlides);
    });
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
        generateSlides(presentation.data.presentationId);
        console.log(`Created Presentation: https://docs.google.com/presentation/d/${presentation.data.presentationId}`);
    });

    //build the slides
    
    let request = slideConverter.build(slideData);

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
