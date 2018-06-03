const request = require('request');
const Person = require('../entities/Person');

module.exports = class randomPerson {

    get () {
        let person = new Person();
        return new Promise((resolve) => request.get({ url: 'https://randomuser.me/api/' },
            function (error, response, body) {
                let ucfirst = (string) => {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                };

                person.id = JSON.parse(body).info.seed;
                person.forename = ucfirst(JSON.parse(body).results[0].name.first);
                person.surname = ucfirst(JSON.parse(body).results[0].name.last);
                person.email = JSON.parse(body).results[0].email;
                person.photo = JSON.parse(body).results[0].picture.large;
                resolve(person);
            }
        ));
    }
};
