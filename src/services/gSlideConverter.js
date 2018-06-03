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
                                        "magnitude": 150,
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
                                    "translateX": 320,
                                    "translateY": 50,
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
                    }
                   //updateTextStyle
                ]
            );
            switch (slide.type()){
                case "TEXT":
                    console.log(new gSlideText(100, 100, 200, 100, slide.content.text, PAGE_ID).getObject())
                    request = request.concat(new gSlideText(100, 100, 200, 100, slide.content.text, PAGE_ID).getObject());
                    break;
                    case "IMAGE":
                    console.log(new gSlideImage(100, 100, 200, 100, slide.content.img, PAGE_ID).getObject())
                    request = request.concat(new gSlideImage(50, 150, 100, 100, slide.content.img, PAGE_ID).getObject());
                    break;
                case "TEXT_IMAGE":
                    request.concat(new gSlideImage(100, 100, 300, 100, slide.content.text, PAGE_ID).getObject());
                    request = request.concat(new gSlideText(50, 150, 100, 100, slide.content.img, PAGE_ID).getObject());
                    break;
                case "EMPTY":
                default:
            }
        });
        
        var fs = require('fs');
        fs.writeFile('myjsonfile.json', request, 'utf8', null);
        return request;
    }
}