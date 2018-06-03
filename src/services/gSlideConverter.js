const gSlideImage = require("../entities/gSlideImage");
const gSlideText = require("../entities/gSlideText");
const gSlideEmpty = require("../entities/gSlideEmpty");
const randomUser = require("../services/randomUserSlide");
const randomUserGen = require("../services/createRandomPerson");

module.exports = {
    img: 0,
    buildTitlePage: function (subreddit, person) {
        this.img = parseInt(Math.floor(Math.random() * 5));
        let titlePage = [{
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
                        fontFamily: 'Roboto',
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
                        "scaleX": Math.cos(180 * (Math.PI / 180)),
                        "scaleY": Math.cos(180 * (Math.PI / 180)),
                        "shearX": Math.sin(180 * (Math.PI / 180)),
                        "shearY": -Math.sin(180 * (Math.PI / 180)),
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
        titlePage = titlePage.concat([{
                "createShape": {
                    "objectId": 'p' + person.id,
                    "shapeType": "TEXT_BOX",
                    "elementProperties": {
                        "pageObjectId": 'p',
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
                            "translateX": 325,
                            "translateY": 370,
                            "unit": "PT"
                        }
                    }
                }
            },
            {
                "insertText": {
                    "objectId": 'p' + person.id,
                    "text": person.forename + ' ' + person.surname + '    ' + person.email,
                    "insertionIndex": 0
                }
            },
            {
                updateTextStyle: {
                    objectId: 'p' + person.id,
                    textRange: {
                        type: 'ALL'
                    },
                    style: {
                        fontFamily: 'Roboto',
                        fontSize: {
                            magnitude: 13,
                            unit: 'PT'
                        },
                        foregroundColor: {
                            opaqueColor: {
                                rgbColor: {
                                    blue: 0.5,
                                    green: 0.5,
                                    red: 0.5
                                }
                            }
                        }
                    },
                    fields: 'foregroundColor,fontFamily,fontSize'
                }
            }
        ]);

        titlePage = titlePage.concat(new gSlideImage(620, 300, 100, 100, person.photo, 'p').getObject());


        if (subreddit.data.banner_img) {
            titlePage = titlePage.concat(new gSlideImage(200, 200, 150, 150, subreddit.data.banner_img, 'p').getObject())
        }
        if (subreddit.data.icon_img) {
            titlePage = titlePage.concat(new gSlideImage(50, 200, 150, 150, subreddit.data.icon_img, 'p').getObject())
        }

        return titlePage;
    },
    build: function (input, person) {
        let request = []; // new randomUser(new randomUserGen().getPerson).getObject();

        input.forEach((slide, i) => {
            console.log(slide.type());

            const PAGE_ID = "p0000" + i;
            const TITLE_ID = PAGE_ID + "_title";

            //add page
            request = request.concat(
                [{
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
                                fontFamily: 'Roboto',
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
                                "scaleX": Math.cos(180 * (Math.PI / 180)),
                                "scaleY": Math.cos(180 * (Math.PI / 180)),
                                "shearX": Math.sin(180 * (Math.PI / 180)),
                                "shearY": -Math.sin(180 * (Math.PI / 180)),
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
                                        "contentUrl": 
                                            ((i % Math.floor(Math.random() * 5) === 0) ? "https://raw.githubusercontent.com/5kilian/whack/master/resources/random" + (Math.floor(Math.random() * 6) + 1) + ".jpg"
                                            : "https://raw.githubusercontent.com/5kilian/whack/master/resources/bg" + this.img + ".png"
                                            )
                                        
                                    }
                                }
                            },
                            "fields": "pageBackgroundFill"
                        }
                    }
                ]
            );


            request = request.concat([{
                    "createShape": {
                        "objectId": PAGE_ID + person.id,
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
                                "translateX": 325,
                                "translateY": 370,
                                "unit": "PT"
                            }
                        }
                    }
                },
                {
                    "insertText": {
                        "objectId": PAGE_ID + person.id,
                        "text": person.forename + ' ' + person.surname + '    ' + person.email,
                        "insertionIndex": 0
                    }
                },
                {
                    updateTextStyle: {
                        objectId: PAGE_ID + person.id,
                        textRange: {
                            type: 'ALL'
                        },
                        style: {
                            fontFamily: 'Roboto',
                            fontSize: {
                                magnitude: 13,
                                unit: 'PT'
                            },
                            foregroundColor: {
                                opaqueColor: {
                                    rgbColor: {
                                        blue: 0.5,
                                        green: 0.5,
                                        red: 0.5
                                    }
                                }
                            }
                        },
                        fields: 'foregroundColor,fontFamily,fontSize'
                    }
                }
            ]);

            request = request.concat(new gSlideImage(620, 300, 100, 100, person.photo, PAGE_ID).getObject());

            switch (slide.type()) {
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
                    request = request.concat(new gSlideEmpty(70, 100, 590, 250, slide.content.comments, PAGE_ID).getObject());
                default:
            }
        });

        //var fs = require('fs');
        //fs.writeFile('myjsonfile.json', request, 'utf8', null);
        return request;
    }
};