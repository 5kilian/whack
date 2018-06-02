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
        console.log(`https://docs.google.com/presentation/d/${presentation.data.presentationId}`);
        generateSlides(presentation.data.presentationId);
    });

    //build the slides
    var requests = [{
        createSlide: {
            slideLayoutReference: {
                predefinedLayout: 'TITLE_AND_TWO_COLUMNS'
            }
        }
    }];

    function generateSlides(presentationId) {
        slides.presentations.batchUpdate({
            presentationId: presentationId,
            resource: {
                requests: requests
            }
        }, function (err, createSlideResponse) {
            if (err) {
                console.log(err);
            }
            console.log(createSlideResponse);
            console.log(`Created slide with ID: ${createSlideResponse.data.replies[0].createSlide.objectId}`);
        });
    }
}
