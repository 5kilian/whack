
const request = require('request');
const RandomPerson = require('./entities/Person');

module.exports = {
    get: function () {
        
        request.get({
                url: 'https://randomuser.me/api/'
            },
            function (error, response, body) {
                //console.log('body:', JSON.parse(body).results[0].gender);
                let randomPerson = new Person();
                randomPerson.forename   = JSON.parse(body).results[0].name.first;
                randomPerson.surname    = JSON.parse(body).results[0].name.last;
                randomPerson.city       = JSON.parse(body).results[0].location.city;
                randomPerson.username   = JSON.parse(body).results[0].login.username;
            }
        );
          
        return randomPerson;
    }
};