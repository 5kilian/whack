/**
 * Reddit subpart
 */

const https = require('https');
const request = require('request');

module.exports = {
    get: function () {

         /*
        https.get('https://www.reddit.com/api/v1/me', (resp) => {
            let data = '';

           
            console.log(resp.body);

            resp.on('data', (chunk) => {
                data += chunk;

                console.log(chunk);
            });
        });
        */
        request('http://www.google.com', function (error, response, body) {
            console.log('body:', body); 
        });

            
        

        return 'Hello Reddit!';

    },
};

/*
https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
*/
