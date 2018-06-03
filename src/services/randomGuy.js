const request = require('request');
const Person = require('../entities/Person');

module.exports = class RandomGuy {

    get () {
        let person = new Person();
        return new Promise((resolve) => request.get({ url: 'https://randomuser.me/api/' },
            function (error, response, body) {
                person.forename = JSON.parse(body).results[0].name.first;
                person.surname = JSON.parse(body).results[0].name.last;
                person.surname = JSON.parse(body).results[0].name.last;
                person.photo = JSON.parse(body).results[0].email;
                resolve(person);
            }
        ));
    }
};
