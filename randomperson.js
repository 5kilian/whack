
const request = require('request');

module.exports = {
    get: function () {
        
        request.get({
                url: 'https://randomuser.me/api/'
            },
            function (error, response, body) {
                console.log('body:', body);
            }
        );
          

        return 'Hello Person!';
    }
};