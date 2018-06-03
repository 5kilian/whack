/**
 * Internal Class to represent Google Slide Images
 */
module.exports = class footprint {
    /**
     * construct a new Google Slide Image
     */
    constructor(xPos, yPos, width, height, name, imgUrl, email, pageId) {
        this.height = height;
        this.width = width + 50;
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;
        this.imgUrl = imgUrl;
        this.email = email;
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
                        "translateY": this.yPos+ 50,
                        "unit": "PT"
                    }
                }
            }
        }];
    }
}