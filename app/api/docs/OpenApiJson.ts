const OpenApiJson = {
    "openapi": "3.0.2",
    "paths": {
      "/api/komik/manga": {
        "get": {
          "description": "Fetches a list of manga based on type manga and other query parameters. Supports pagination and ordering.",
          "summary": "Fetch a list of manga",
          "tags": [
            "komik"
          ],
          "parameters": [
            {
              "name": "page",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "order",
              "in": "query",
              "schema": {
                "type": "string",
                "enum": [
                  "update",
                  "popular",
                  "titleasc",
                  "titledesc"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "200",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string"
                            },
                            "image": {
                              "type": "string"
                            },
                            "chapter": {
                              "type": "string"
                            },
                            "score": {
                              "type": "string"
                            },
                            "type": {
                              "type": "string"
                            },
                            "komik_id": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "title",
                            "image",
                            "chapter",
                            "score",
                            "type",
                            "komik_id"
                          ]
                        }
                      },
                      "prevPage": {
                        "type": "boolean"
                      },
                      "nextPage": {
                        "type": "boolean"
                      }
                    },
                    "required": [
                      "data",
                      "prevPage",
                      "nextPage"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "400",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "500",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            }
          }
        }
      },
      "/api/komik/manhwa": {
        "get": {
          "description": "Fetches a list of manhwa based on type manhwa and other query parameters. Supports pagination and ordering.",
          "summary": "Fetch a list of manhwa",
          "tags": [
            "komik"
          ],
          "parameters": [
            {
              "name": "page",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "order",
              "in": "query",
              "schema": {
                "type": "string",
                "enum": [
                  "update",
                  "popular",
                  "titleasc",
                  "titledesc"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "200",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string"
                            },
                            "image": {
                              "type": "string"
                            },
                            "chapter": {
                              "type": "string"
                            },
                            "score": {
                              "type": "string"
                            },
                            "type": {
                              "type": "string"
                            },
                            "komik_id": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "title",
                            "image",
                            "chapter",
                            "score",
                            "type",
                            "komik_id"
                          ]
                        }
                      },
                      "prevPage": {
                        "type": "boolean"
                      },
                      "nextPage": {
                        "type": "boolean"
                      }
                    },
                    "required": [
                      "data",
                      "prevPage",
                      "nextPage"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "400",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "500",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            }
          }
        }
      },
      "/api/komik/manhua": {
        "get": {
          "description": "Fetches a list of manhua based on type manhua and other query parameters. Supports pagination and ordering.",
          "summary": "Fetch a list of manhua",
          "tags": [
            "komik"
          ],
          "parameters": [
            {
              "name": "page",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "order",
              "in": "query",
              "schema": {
                "type": "string",
                "enum": [
                  "update",
                  "popular",
                  "titleasc",
                  "titledesc"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "200",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string"
                            },
                            "image": {
                              "type": "string"
                            },
                            "chapter": {
                              "type": "string"
                            },
                            "score": {
                              "type": "string"
                            },
                            "type": {
                              "type": "string"
                            },
                            "komik_id": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "title",
                            "image",
                            "chapter",
                            "score",
                            "type",
                            "komik_id"
                          ]
                        }
                      },
                      "prevPage": {
                        "type": "boolean"
                      },
                      "nextPage": {
                        "type": "boolean"
                      }
                    },
                    "required": [
                      "data",
                      "prevPage",
                      "nextPage"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "400",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "500",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            }
          }
        }
      },
      "/api/komik/search": {
        "get": {
          "description": "Fetches a list of manga based on query",
          "summary": "Fetch a list of manga",
          "tags": [
            "komik"
          ],
          "parameters": [
            {
              "name": "query",
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "200",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string"
                            },
                            "image": {
                              "type": "string"
                            },
                            "chapter": {
                              "type": "string"
                            },
                            "score": {
                              "type": "string"
                            },
                            "type": {
                              "type": "string"
                            },
                            "komik_id": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "title",
                            "image",
                            "chapter",
                            "score",
                            "type",
                            "komik_id"
                          ]
                        }
                      }
                    },
                    "required": [
                      "message",
                      "data"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "400",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "500",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            }
          }
        }
      },
      "/api/komik/detail": {
        "get": {
          "description": "Fetches details of a specific manga by its ID.",
          "summary": "Fetch manga details",
          "tags": [
            "komik"
          ],
          "parameters": [
            {
              "name": "komik_id",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "200",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "type": "string"
                          },
                          "alternativeTitle": {
                            "type": "string"
                          },
                          "score": {
                            "type": "string"
                          },
                          "image": {
                            "type": "string"
                          },
                          "description": {
                            "type": "string"
                          },
                          "status": {
                            "type": "string"
                          },
                          "type": {
                            "type": "string"
                          },
                          "releaseDate": {
                            "type": "string"
                          },
                          "author": {
                            "type": "string"
                          },
                          "totalChapter": {
                            "type": "string"
                          },
                          "updatedOn": {
                            "type": "string"
                          },
                          "genres": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "chapters": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "chapter": {
                                  "type": "string"
                                },
                                "date": {
                                  "type": "string"
                                },
                                "chapter_id": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "chapter",
                                "date",
                                "chapter_id"
                              ]
                            }
                          }
                        },
                        "required": [
                          "title",
                          "alternativeTitle",
                          "score",
                          "image",
                          "description",
                          "status",
                          "type",
                          "releaseDate",
                          "author",
                          "totalChapter",
                          "updatedOn",
                          "genres",
                          "chapters"
                        ]
                      }
                    },
                    "required": [
                      "message",
                      "data"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "400",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "500",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            }
          }
        }
      },
      "/api/komik/chapter": {
        "get": {
          "description": "Fetches images for a specific manga chapter by its URL.",
          "summary": "Fetch manga chapter images",
          "tags": [
            "komik"
          ],
          "parameters": [
            {
              "name": "chapter_url",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "200",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "type": "string"
                          },
                          "next_chapter_id": {
                            "type": "string"
                          },
                          "prev_chapter_id": {
                            "type": "string"
                          },
                          "images": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        },
                        "required": [
                          "title",
                          "next_chapter_id",
                          "prev_chapter_id",
                          "images"
                        ]
                      }
                    },
                    "required": [
                      "message",
                      "data"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "400",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "500",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "message"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    "info": {
      "title": "Freefire",
      "version": "9.9.9",
      "description": "api gratis"
    },
    "servers": [
      {
        "url": "https://asepharyana.my.id",
        "description": "Production"
      },
      {
        "url": "http://localhost:3090",
        "description": "Development"
      }
    ]
  }

export default OpenApiJson;