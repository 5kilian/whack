const gSlideImage = require("../entities/gSlideImage");
const gSlideText = require("../entities/gSlideText");
const randomUser = require("../services/randomUserSlide")
const randomUserGen = require("../services/createRandomPerson")

module.exports = {
    build: function (input) {
        let request = new randomUser(new randomUserGen().getPerson).getObject();

        input.forEach((slide, i) => {
            console.log(slide.type());

            const PAGE_ID = "p0000" + i;
            const TITLE_ID = PAGE_ID + "_title";

            //add page
            request = request.concat(
                [
                    {
                        createSlide: {
                            objectId: PAGE_ID,
                            slideLayoutReference: {
                                predefinedLayout: 'BLANK'
                            }
                        }
                    },
                    //add title
                    {
                        "createShape": {
                            "objectId": TITLE_ID,
                            "shapeType": "TEXT_BOX",
                            "elementProperties": {
                                "pageObjectId": PAGE_ID,
                                "size": {
                                    "width": {
                                        "magnitude": 590,
                                        "unit": "PT"
                                    },
                                    "height": {
                                        "magnitude": 50,
                                        "unit": "PT"
                                    }
                                },
                                "transform": {
                                    "scaleX": 1,
                                    "scaleY": 1,
                                    "translateX": 70,
                                    "translateY": 25,
                                    "unit": "PT"
                                }
                            }
                        }
                    },
                    {
                        "insertText": {
                            "objectId": TITLE_ID,
                            "text": slide.title,
                            "insertionIndex": 0
                        }
                    },
                    {
                        updateTextStyle: {
                            objectId: TITLE_ID,
                            textRange: {
                                type: 'ALL'
                            },
                            style: {
                                fontFamily: 'Georgia',
                                fontSize: {
                                    magnitude: 30,
                                    unit: 'PT'
                                },
                                foregroundColor: {
                                    opaqueColor: {
                                        rgbColor: {
                                            blue: 0.0,
                                            green: 0.0,
                                            red: 0.0
                                        }
                                    }
                                }
                            },
                            fields: 'foregroundColor,fontFamily,fontSize'
                        }
                    },
                    {
                        updateParagraphStyle: {
                            "objectId": TITLE_ID,
                            "style": {
                                "alignment": 'CENTER'
                            },
                            "fields": "alignment"
                        }
                    }
                   //updateTextStyle
                ]
            );
            switch (slide.type()){
                case "TEXT":
                    request = request.concat(new gSlideText(70, 100, 590, 250, slide.content.text, PAGE_ID).getObject());
                    break;
                case "IMAGE":
                    request = request.concat(new gSlideImage(70, 100, 590, 250, slide.content.img, PAGE_ID).getObject());
                    break;
                case "TEXT_IMAGE":
                    request = request.concat(new gSlideImage(300, 150, 100, 150, slide.content.text, PAGE_ID).getObject());
                    request = request.concat(new gSlideText(300, 150, 100, 150, slide.content.img, PAGE_ID).getObject());
                    break;
                case "EMPTY":
                default:
            }
        });

        //var fs = require('fs');
        //fs.writeFile('myjsonfile.json', request, 'utf8', null);
        return request;
    }
}