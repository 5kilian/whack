module.exports = {
    build: function (input) {
        let request = [];

        input.forEach((slide, i) => {
            const PAGE_ID = "p0000" + i;
            const TITLE_ID = PAGE_ID + "_title";
            const CONTENT0_ID = PAGE_ID + "_c0";
            const CONTENT1_ID = PAGE_ID + "_c1";

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
                                    "translateY": 200,
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
                    //add content
                    {
                        "createShape": {
                            "objectId": CONTENT0_ID,
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
                                    "translateX": 200,
                                    "translateY": 100,
                                    "unit": "PT"
                                }
                            }
                        }
                    },
                    {
                        "insertText": {
                            "objectId": CONTENT0_ID,
                            "text": slide.content.text,
                            "insertionIndex": 0
                        }
                    },
                    //add Image
                    {
                        "createImage": {
                            "url": 'https://i.redd.it/kw5tz09mem111.gif',
                            "elementProperties": {
                                "pageObjectId": PAGE_ID,
                                "size": {
                                    "width": {
                                        "magnitude": 30,
                                        "unit": "PT"
                                    },
                                    "height": {
                                        "magnitude": 30,
                                        "unit": "PT"
                                    }
                                },
                                "transform": {
                                    "scaleX": 1,
                                    "scaleY": 1,
                                    "translateX": 200,
                                    "translateY": 100,
                                    "unit": "PT"
                                }
                            }
                        }
                    }
                ]);
        });
        return request;
    }
}