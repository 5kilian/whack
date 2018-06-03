const gSlideImage = require("../entities/gSlideImage");
const gSlideText = require("../entities/gSlideText");
const randomUser = require("../services/randomUserSlide")
const randomUserGen = require("../services/createRandomPerson")

module.exports = {
    img: 0,
    buildTitlePage: function (subreddit) {
        this.img = Math.floor(Math.random() * 3);
        let titlePage = [
            {
                "createShape": {
                    "objectId": 'p_title',
                    "shapeType": "TEXT_BOX",
                    "elementProperties": {
                        "pageObjectId": 'p',
                        "size": {
                            "width": {
                                "magnitude": 590,
                                "unit": "PT"
                            },
                            "height": {
                                "magnitude": 150,
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
                    "objectId": 'p_title',
                    "text": subreddit.data.title,
                    "insertionIndex": 0
                }
            },
            {
                updateTextStyle: {
                    objectId: 'p_title',
                    textRange: {
                        type: 'ALL'
                    },
                    style: {
                        fontFamily: 'Georgia',
                        fontSize: {
                            magnitude: 70,
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
                "createShape": {
                    "objectId": 'l_shape_0',
                    "shapeType": "RIGHT_TRIANGLE",
                    "elementProperties": {
                        "pageObjectId": 'p',
                        "size": {
                            "width": {
                                "magnitude": 100,
                                "unit": "PT"
                            },
                            "height": {
                                "magnitude": 260,
                                "unit": "PT"
                            }
                        },
                        "transform": {
                            "scaleX": 1,
                            "scaleY": 1,
                            "translateX": 0,
                            "translateY": 150,
                            "unit": "PT"
                        }
                    }
                },
            },
            {
                "createShape": {
                    "objectId": 'l_shape_1',
                    "shapeType": "RIGHT_TRIANGLE",
                    "elementProperties": {
                        "pageObjectId": 'p',
                        "size": {
                            "width": {
                                "magnitude": 90,
                                "unit": "PT"
                            },
                            "height": {
                                "magnitude": 220,
                                "unit": "PT"
                            }
                        }
                    }
                }
            },
            {
                "updateShapeProperties": {
                    "objectId": 'l_shape_1',
                    "fields": "outline",
                    "shapeProperties": {
                        "outline": {
                            "propertyState": 'NOT_RENDERED'
                        }
                    }
                }
            },
            {
                "updateShapeProperties": {
                    "objectId": 'l_shape_0',
                    "fields": "outline",
                    "shapeProperties": {
                        "outline": {
                            "propertyState": 'NOT_RENDERED'
                        }
                    }
                }
            },
            {
                "updatePageElementTransform": {
                    "objectId": 'l_shape_1',
                    "applyMode": "RELATIVE",
                    "transform": {
                        "scaleX":  Math.cos(180 * (Math.PI/180)),
                        "scaleY":  Math.cos(180 * (Math.PI/180)),
                        "shearX":  Math.sin(180 * (Math.PI/180)),
                        "shearY": -Math.sin(180 * (Math.PI/180)),
                        "unit": "EMU"
                    }
                }
            },
            {
                "updatePageElementTransform": {
                    "objectId": 'l_shape_1',
                    "applyMode": "RELATIVE",
                    "transform": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "translateX": 720,
                        "translateY": 220,
                        "unit": "PT"
                    }
                }
            },
            {
                "updatePageProperties": {
                    "objectId": 'p',
                    "pageProperties": {
                        "pageBackgroundFill": {
                            "stretchedPictureFill": {
                                "contentUrl": "https://raw.githubusercontent.com/5kilian/whack/master/resources/bg" + this.img + ".png"
                            }
                        }
                    },
                    "fields": "pageBackgroundFill"
                }
            }
        ];


        if (subreddit.data.banner_img) {
            titlePage = titlePage.concat(new gSlideImage(50, 200, 300, 300, subreddit.data.banner_img, 'p').getObject())
        }
        if (subreddit.data.icon_img) {
            titlePage = titlePage.concat(new gSlideImage(50, 200, 300, 300, subreddit.data.icon_img, 'p').getObject())
        }

        return titlePage;
    },
    build: function (input) {
        let request = []; // new randomUser(new randomUserGen().getPerson).getObject();

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
                    ,
                    {
                        "createShape": {
                            "objectId": PAGE_ID + 'l_shape_0',
                            "shapeType": "RIGHT_TRIANGLE",
                            "elementProperties": {
                                "pageObjectId": PAGE_ID,
                                "size": {
                                    "width": {
                                        "magnitude": 100,
                                        "unit": "PT"
                                    },
                                    "height": {
                                        "magnitude": 260,
                                        "unit": "PT"
                                    }
                                },
                                "transform": {
                                    "scaleX": 1,
                                    "scaleY": 1,
                                    "translateX": 0,
                                    "translateY": 150,
                                    "unit": "PT"
                                }
                            }
                        },
                    },
                    {
                        "createShape": {
                            "objectId": PAGE_ID + 'l_shape_1',
                            "shapeType": "RIGHT_TRIANGLE",
                            "elementProperties": {
                                "pageObjectId": PAGE_ID,
                                "size": {
                                    "width": {
                                        "magnitude": 90,
                                        "unit": "PT"
                                    },
                                    "height": {
                                        "magnitude": 220,
                                        "unit": "PT"
                                    }
                                }
                            }
                        }
                    },
                    {
                        "updateShapeProperties": {
                            "objectId": PAGE_ID + 'l_shape_1',
                            "fields": "outline",
                            "shapeProperties": {
                                "outline": {
                                    "propertyState": 'NOT_RENDERED'
                                }
                            }
                        }
                    },
                    {
                        "updateShapeProperties": {
                            "objectId": PAGE_ID + 'l_shape_0',
                            "fields": "outline",
                            "shapeProperties": {
                                "outline": {
                                    "propertyState": 'NOT_RENDERED'
                                }
                            }
                        }
                    },
                    {
                        "updatePageElementTransform": {
                            "objectId": PAGE_ID + 'l_shape_1',
                            "applyMode": "RELATIVE",
                            "transform": {
                                "scaleX":  Math.cos(180 * (Math.PI/180)),
                                "scaleY":  Math.cos(180 * (Math.PI/180)),
                                "shearX":  Math.sin(180 * (Math.PI/180)),
                                "shearY": -Math.sin(180 * (Math.PI/180)),
                                "unit": "EMU"
                            }
                        }
                    },
                    {
                        "updatePageElementTransform": {
                            "objectId": PAGE_ID + 'l_shape_1',
                            "applyMode": "RELATIVE",
                            "transform": {
                                "scaleX": 1,
                                "scaleY": 1,
                                "translateX": 720,
                                "translateY": 220,
                                "unit": "PT"
                            }
                        }
                    },
                    {
                        "updatePageProperties": {
                            "objectId": PAGE_ID,
                            "pageProperties": {
                                "pageBackgroundFill": {
                                    "stretchedPictureFill": {
                                        "contentUrl": "https://raw.githubusercontent.com/5kilian/whack/master/resources/bg" + this.img + ".png"
                                    }
                                }
                            },
                            "fields": "pageBackgroundFill"
                        }
                    }
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
};
