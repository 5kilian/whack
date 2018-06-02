
const request = require('request');
const Person = require('./entities/Person');

module.exports = {
    get: function () {

        let randomPerson = new Person();
        
        request.get({
                url: 'https://randomuser.me/api/'
            },
            function (error, response, body) {
                //console.log('body:', JSON.parse(body).results[0].name);
                //console.log('body:', JSON.parse(body).results[0].name.first);
                
                randomPerson.forename   = JSON.parse(body).results[0].name.first;
                randomPerson.surname    = JSON.parse(body).results[0].name.last;
                randomPerson.city       = JSON.parse(body).results[0].location.city;
                randomPerson.username   = JSON.parse(body).results[0].login.username;
                randomPerson.photo      = JSON.parse(body).results[0].login.picture.large;
            }
        );
          
        return randomPerson;
    }
};