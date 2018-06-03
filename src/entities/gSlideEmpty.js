

/**
 * Internal Class to represent Google Slide Text
 * 
 * use this.content_id to refer to the ID
 * 
 */
module.exports = class gSlideEmpty {

    /**
    * @param {number} xPos 
    * @param {number} yPos 
    * @param {number} width 
    * @param {number} height 
    * @param {string} comment 
    */
    constructor(xPos, yPos, width, height, comments, pageId) {
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.comments = " " + comments[0];
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
                "text": this.comments,
                "insertionIndex": 0
            }
        },
        {
            updateTextStyle: {
                objectId: this.content_id,
                textRange: {
                    type: 'ALL'
                },
                style: {
                    fontSize: {
                        magnitude: 20,
                        unit: 'PT'
                    }
                },
                fields: 'foregroundColor,fontFamily,fontSize'
            }
        },
    
    ];
    }
};