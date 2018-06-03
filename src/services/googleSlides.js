const authorize = require('../auth/google/authorize');
const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const slideConverter = require('./gSlideConverter');
const RandomPerson = require("../services/createRandomPerson");

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
    download: function (presentation) {

    }
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
    const slides = google.slides({ version: 'v1', auth });

    //create a new presentation
    new RandomPerson().get().then(person => {
        let request = [];
        request = request.concat(slideConverter.buildTitlePage(subData, person)).concat(slideConverter.build(slideData, person));

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
    });

}
