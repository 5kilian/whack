/**
 * Reddit subpart
 */

const request = require('request');

module.exports = {
    get: function () {
         request.post({
                 url: 'https://www.reddit.com/api/v1/access_token?grant_type=password&username=whackaoke&password=whackathon2k18',
                 headers: {
                     'User-Agent': 'Mozilla/5.0',
                     'Authorization': 'Basic S3JkWnVnX2hfRkRkbnc6NkhNQjJLN18xRDhTX29pMXZQRUhrdTZSbkpn'
                 }
             },
             function (error, response, body) {
                console.log('body:', body);
            }
        );

        return 'Hello Reddit!';
    },
};

/*
https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
*/
