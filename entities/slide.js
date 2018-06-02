
module.exports = class Slide {
    constructor () {
        this.title = '';
        this.content = {
            img: '',
            text: ''
        };
        this.author = {
            name: ''
        };
        /**
         * TITLE
         * TITLE_AND_BODY
         * TITLE_AND_TWO_COLUMNS
         */
        this.layout = '';
    }
};
