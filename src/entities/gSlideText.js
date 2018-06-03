/**
 * Internal Class to represent Google Slide Text
 * 
 * use this.content_id to refer to the ID
 * 
 */
module.exports = class gSlideText {

    /**
    * @param {number} xPos 
    * @param {number} yPos 
    * @param {number} width 
    * @param {number} height 
    * @param {string} text 
    */
    constructor(xPos, yPos, width, height, text, pageId) {
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.text = text;
        this.content_id = "TEXT" + Math.random().toString(36).slice(2);
        this.pageId = pageId;
    }

    /**
     * get the google slide API compatible request objects
     */
    getObject() {
        return [{
            "createShape": {
                "objectId": this.content_id,
                "shapeType": "TEXT_BOX",
                "elementProperties": {
                    "pageObjectId": this.pageId,
                    "size": {
                        "width": {
                            "magnitude": this.width,
                            "unit": "PT"
                        },
                        "height": {
                            "magnitude": this.height,
                            "unit": "PT"
                        }
                    },
                    "transform": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "translateX": this.xPos,
                        "translateY": this.yPos,
                        "unit": "PT"
                    }
                }
            }
        }, {
            "insertText": {
                "objectId": this.content_id,
                "text": this.text,
                "insertionIndex": 0
            }
        }];
    }
};