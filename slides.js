const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const authorize = require('./auth/google/authorize')

/**
 * Google Slides subpart
 */
module.exports = {
    newPresentation: function () {
        init();
        return "Slides created.";
    },
};

// Load client secrets from a local file.
function init() {
    fs.readFile('client_secret.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Slides API.
        authorize(JSON.parse(content), buildSlides);
    });
}

function buildSlides(auth) {
    let presentationId;

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
        presentationId = presentation.data.presentationId;
        console.log(presentation);
        console.log(`https://docs.google.com/presentation/d/${presentationId}`);
    });

    //build the slides
    var requests = [{
        createSlide: {
            objectId: 1,
            insertionIndex: '1',
            slideLayoutReference: {
                predefinedLayout: 'TITLE_AND_TWO_COLUMNS'
            }
        }
    }];

    function generateSlides() {
        slides.presentations.batchUpdate({
            presentationId: presentationId,
            resource: {
                requests: requests
            }
        }, function (err, createSlideResponse) {
            if (err) {
                console.log(err);
            }
            console.log(`Created slide with ID: ${createSlideResponse.replies[0].createSlide.objectId}`);
        });
    }
}
