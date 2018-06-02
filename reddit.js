/**
 * Reddit subpart
 */

const request = require('request');
const fs = require('fs');

const reddit = 'https://www.reddit.com';
const reddit_oauth = 'https://oauth.reddit.com';

module.exports = {
    get: function () {
        return 'Hello Reddit!';
    },
    auth: function () {
        return new Promise((resolve, reject) => request.post({
                url: reddit + '/api/v1/access_token?grant_type=password&username=whackaoke&password=whackathon2k18',
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Authorization': 'Basic S3JkWnVnX2hfRkRkbnc6NkhNQjJLN18xRDhTX29pMXZQRUhrdTZSbkpn'
                }
            }, (error, response, body) => {
                fs.writeFile('auth/reddit/credentials.json', body, (err) => { });
                resolve(JSON.parse(body));
            }
        ));
    },
    subreddit: function (sub) {
        request({
            'url': reddit + '/r/' + sub + '/.json'
        }, (error, response, body) => {
            console.log(body);
        });
    },
};
