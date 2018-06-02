/**
 * Reddit subpart
 */

const request = require('request');
const fs = require('fs');

const Slide = require('./entities/slide');

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
        return new Promise((resolve, reject) => {
            request(reddit + '/r/' + sub, (error, response, html) => {
                request(reddit + '/r/' + sub + '.json', (error, response, body) => {
                    resolve(JSON.parse(body).data.children.map(child => this.createTitleSlide(html)));
                    resolve(JSON.parse(body).data.children.map(child => this.createSlide(child.data)));
                })
            });
        });
    },
    createTitleSlide: function (html) {
        console.log(html);
    },
    createSlide: function (child) {
        let slide = new Slide();
        slide.title = child.title;
        slide.content.text = child.author_flair_text;
        slide.content.img = child.url;
        slide.author.name = child.author;
        return slide;
    }
};
