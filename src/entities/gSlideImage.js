/**
 * Internal Class to represent Google Slide Images
 */
module.exports = class gSlideImage {
    /**
     * construct a new Google Slide Image
     */
    constructor(xPos, yPos, width, height, imgUrl, pageId) {
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.imgUrl = imgUrl;
        this.pageId = pageId;
    }

    /**
     * get the google slide API compatible request objects
     */
    getObject() {
        return [
            {
            "createImage": {
                "url": this.imgUrl,
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
        }];
    }
}