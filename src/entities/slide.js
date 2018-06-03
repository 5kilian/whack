
/**
 * Internal Class to represent slides
 */
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
        this.type = () => {
            
            if (this.content.text && this.content.img) {
                return 'TEXT_IMAGE';
            } else if (this.content.text) {
                return 'TEXT';
            } else if (this.content.img) {
                return 'IMAGE';
            }
            return 'EMPTY';
        }
    }
};
