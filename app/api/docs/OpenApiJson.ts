const OpenApiJson = {
  openapi: '3.0.2',
  paths: {
    '/api/komik/manga': {
      get: {
        description:
          'Mengambil daftar manga berdasarkan jenis manga dan parameter kueri lainnya. Mendukung pagination dan pengurutan.',
        summary: 'Mengambil daftar manga',
        tags: ['komik'],
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'order',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['update', 'popular', 'titleasc', 'titledesc']
            }
          }
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: {
                            type: 'string'
                          },
                          image: {
                            type: 'string'
                          },
                          chapter: {
                            type: 'string'
                          },
                          score: {
                            type: 'string'
                          },
                          type: {
                            type: 'string'
                          },
                          komik_id: {
                            type: 'string'
                          }
                        },
                        required: ['title', 'image', 'chapter', 'score', 'type', 'komik_id']
                      }
                    },
                    prevPage: {
                      type: 'boolean'
                    },
                    nextPage: {
                      type: 'boolean'
                    }
                  },
                  required: ['data', 'prevPage', 'nextPage']
                }
              }
            }
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          },
          '500': {
            description: '500',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          }
        }
      }
    },
    '/api/komik/manhwa': {
      get: {
        description:
          'Mengambil daftar manhwa berdasarkan jenis manhwa dan parameter kueri lainnya. Mendukung pagination dan pengurutan.',
        summary: 'Mengambil daftar manhwa',
        tags: ['komik'],
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'order',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['update', 'popular', 'titleasc', 'titledesc']
            }
          }
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: {
                            type: 'string'
                          },
                          image: {
                            type: 'string'
                          },
                          chapter: {
                            type: 'string'
                          },
                          score: {
                            type: 'string'
                          },
                          type: {
                            type: 'string'
                          },
                          komik_id: {
                            type: 'string'
                          }
                        },
                        required: ['title', 'image', 'chapter', 'score', 'type', 'komik_id']
                      }
                    },
                    prevPage: {
                      type: 'boolean'
                    },
                    nextPage: {
                      type: 'boolean'
                    }
                  },
                  required: ['data', 'prevPage', 'nextPage']
                }
              }
            }
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          },
          '500': {
            description: '500',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          }
        }
      }
    },
    '/api/komik/manhua': {
      get: {
        description:
          'Mengambil daftar manhua berdasarkan jenis manhua dan parameter kueri lainnya. Mendukung pagination dan pengurutan.',
        summary: 'Mengambil daftar manhua',
        tags: ['komik'],
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'order',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['update', 'popular', 'titleasc', 'titledesc']
            }
          }
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: {
                            type: 'string'
                          },
                          image: {
                            type: 'string'
                          },
                          chapter: {
                            type: 'string'
                          },
                          score: {
                            type: 'string'
                          },
                          type: {
                            type: 'string'
                          },
                          komik_id: {
                            type: 'string'
                          }
                        },
                        required: ['title', 'image', 'chapter', 'score', 'type', 'komik_id']
                      }
                    },
                    prevPage: {
                      type: 'boolean'
                    },
                    nextPage: {
                      type: 'boolean'
                    }
                  },
                  required: ['data', 'prevPage', 'nextPage']
                }
              }
            }
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          },
          '500': {
            description: '500',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          }
        }
      }
    },
    '/api/komik/search': {
      get: {
        description: 'Mengambil daftar manga berdasarkan kueri',
        summary: 'Mengambil daftar manga',
        tags: ['komik'],
        parameters: [
          {
            name: 'query',
            in: 'query',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: {
                            type: 'string'
                          },
                          image: {
                            type: 'string'
                          },
                          chapter: {
                            type: 'string'
                          },
                          score: {
                            type: 'string'
                          },
                          type: {
                            type: 'string'
                          },
                          komik_id: {
                            type: 'string'
                          }
                        },
                        required: ['title', 'image', 'chapter', 'score', 'type', 'komik_id']
                      }
                    }
                  },
                  required: ['message', 'data']
                }
              }
            }
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          },
          '500': {
            description: '500',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          }
        }
      }
    },
    '/api/komik/detail': {
      get: {
        description: 'Mengambil detail manga tertentu berdasarkan ID-nya.',
        summary: 'Mengambil detail manga',
        tags: ['komik'],
        parameters: [
          {
            name: 'komik_id',
            in: 'query',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    },
                    data: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string'
                        },
                        alternativeTitle: {
                          type: 'string'
                        },
                        score: {
                          type: 'string'
                        },
                        image: {
                          type: 'string'
                        },
                        description: {
                          type: 'string'
                        },
                        status: {
                          type: 'string'
                        },
                        type: {
                          type: 'string'
                        },
                        releaseDate: {
                          type: 'string'
                        },
                        author: {
                          type: 'string'
                        },
                        totalChapter: {
                          type: 'string'
                        },
                        updatedOn: {
                          type: 'string'
                        },
                        genres: {
                          type: 'array',
                          items: {
                            type: 'string'
                          }
                        },
                        chapters: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              chapter: {
                                type: 'string'
                              },
                              date: {
                                type: 'string'
                              },
                              chapter_id: {
                                type: 'string'
                              }
                            },
                            required: ['chapter', 'date', 'chapter_id']
                          }
                        }
                      },
                      required: [
                        'title',
                        'alternativeTitle',
                        'score',
                        'image',
                        'description',
                        'status',
                        'type',
                        'releaseDate',
                        'author',
                        'totalChapter',
                        'updatedOn',
                        'genres',
                        'chapters'
                      ]
                    }
                  },
                  required: ['message', 'data']
                }
              }
            }
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          },
          '500': {
            description: '500',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          }
        }
      }
    },
    '/api/komik/chapter': {
      get: {
        description: 'Mengambil gambar untuk chapter manga tertentu berdasarkan URL-nya.',
        summary: 'Mengambil gambar chapter manga',
        tags: ['komik'],
        parameters: [
          {
            name: 'chapter_url',
            in: 'query',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    },
                    data: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string'
                        },
                        next_chapter_id: {
                          type: 'string'
                        },
                        prev_chapter_id: {
                          type: 'string'
                        },
                        images: {
                          type: 'array',
                          items: {
                            type: 'string'
                          }
                        }
                      },
                      required: ['title', 'next_chapter_id', 'prev_chapter_id', 'images']
                    }
                  },
                  required: ['message', 'data']
                }
              }
            }
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          },
          '500': {
            description: '500',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  },
                  required: ['message']
                }
              }
            }
          }
        }
      }
    },
    "/api/anime": {
      "get": {
        "summary": "Mendapatkan anime yang sedang berlangsung dan selesai",
        "tags": [
          "anime"
        ],
        "description": "Mengambil daftar anime yang sedang berlangsung dan yang sudah selesai.",
        "responses": {
          "200": {
            "description": "Respon sukses",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "Ok"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "ongoing_anime": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "title": {
                                "type": "string",
                                "example": "Yuru Camp△ Season 3"
                              },
                              "slug": {
                                "type": "string",
                                "example": "yuru-no-camp-season-3-sub-indo"
                              },
                              "poster": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/wp-content/uploads/2024/04/Yuru-Camp△-Season-3.jpg"
                              },
                              "current_episode": {
                                "type": "string",
                                "example": "Episode OVA2"
                              },
                              "release_day": {
                                "type": "string",
                                "example": "None"
                              },
                              "newest_release_date": {
                                "type": "string",
                                "example": "30 Agu"
                              },
                              "otakudesu_url": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/anime/yuru-no-camp-season-3-sub-indo/"
                              }
                            }
                          }
                        },
                        "complete_anime": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "title": {
                                "type": "string",
                                "example": "Momochi-san Chi no Ayakashi Ouji"
                              },
                              "slug": {
                                "type": "string",
                                "example": "momochisan-sub-indo"
                              },
                              "poster": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/wp-content/uploads/2024/08/Momochi-san-Chi-no-Ayakashi-Ouji-Sub-Indo.jpg"
                              },
                              "episode_count": {
                                "type": "string",
                                "example": "12"
                              },
                              "rating": {
                                "type": "string",
                                "example": "6.49"
                              },
                              "last_release_date": {
                                "type": "string",
                                "example": "30 Agu"
                              },
                              "otakudesu_url": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/anime/momochisan-sub-indo/"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/anime/complete-anime/{slug}": {
      "get": {
        "summary": "Mendapatkan daftar anime",
        "tags": [
          "anime"
        ],
        "description": "Mengambil daftar anime beserta detailnya.",
        "parameters": [
          {
            "name": "slug",
            "in": "path",
            "required": true,
            "description": "Slug untuk halaman Anime.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Daftar anime",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "Ok"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "type": "string",
                            "example": "Momochi-san Chi no Ayakashi Ouji"
                          },
                          "slug": {
                            "type": "string",
                            "example": "momochisan-sub-indo"
                          },
                          "poster": {
                            "type": "string",
                            "format": "uri",
                            "example": "https://otakudesu.cloud/wp-content/uploads/2024/08/Momochi-san-Chi-no-Ayakashi-Ouji-Sub-Indo.jpg"
                          },
                          "episode_count": {
                            "type": "string",
                            "example": "12"
                          },
                          "rating": {
                            "type": "string",
                            "example": "6.49"
                          },
                          "last_release_date": {
                            "type": "string",
                            "example": "30 Agu"
                          },
                          "otakudesu_url": {
                            "type": "string",
                            "format": "uri",
                            "example": "https://otakudesu.cloud/anime/momochisan-sub-indo/"
                          }
                        }
                      }
                    },
                    "pagination": {
                      "type": "object",
                      "properties": {
                        "current_page": {
                          "type": "integer",
                          "example": 1
                        },
                        "last_visible_page": {
                          "type": "integer",
                          "example": 55
                        },
                        "has_next_page": {
                          "type": "boolean",
                          "example": true
                        },
                        "next_page": {
                          "type": "integer",
                          "example": 2
                        },
                        "has_previous_page": {
                          "type": "boolean",
                          "example": false
                        },
                        "previous_page": {
                          "type": "integer",
                          "nullable": true,
                          "example": null
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/anime/ongoing-anime/{slug}": {
      "get": {
        "summary": "Dapatkan daftar anime yang sedang tayang berdasarkan slug",
        "tags": [
          "anime"
        ],
        "parameters": [
          {
            "name": "slug",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "slug untuk halaman anime"
          }
        ],
        "responses": {
          "200": {
            "description": "Daftar anime yang sedang tayang berhasil didapatkan",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "Ok"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "type": "string",
                            "example": "Yuru Camp△ Season 3"
                          },
                          "slug": {
                            "type": "string",
                            "example": "yuru-no-camp-season-3-sub-indo"
                          },
                          "poster": {
                            "type": "string",
                            "example": "https://otakudesu.cloud/wp-content/uploads/2024/04/Yuru-Camp△-Season-3.jpg"
                          },
                          "current_episode": {
                            "type": "string",
                            "example": "Episode OVA2"
                          },
                          "release_day": {
                            "type": "string",
                            "example": "None"
                          },
                          "newest_release_date": {
                            "type": "string",
                            "example": "30 Agu"
                          },
                          "otakudesu_url": {
                            "type": "string",
                            "example": "https://otakudesu.cloud/anime/yuru-no-camp-season-3-sub-indo/"
                          }
                        }
                      }
                    },
                    "pagination": {
                      "type": "object",
                      "properties": {
                        "current_page": {
                          "type": "integer",
                          "example": 1
                        },
                        "last_visible_page": {
                          "type": "integer",
                          "example": 5
                        },
                        "has_next_page": {
                          "type": "boolean",
                          "example": true
                        },
                        "next_page": {
                          "type": "integer",
                          "example": 2
                        },
                        "has_previous_page": {
                          "type": "boolean",
                          "example": false
                        },
                        "previous_page": {
                          "type": "integer",
                          "nullable": true,
                          "example": null
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/anime/full/{slug}": {
      "get": {
        "summary": "Dapatkan detail episode anime",
        "tags": [
          "anime"
        ],
        "description": "Mengambil detail dari sebuah episode anime berdasarkan slug.",
        "parameters": [
          {
            "name": "slug",
            "in": "path",
            "required": true,
            "description": "Slug dari episode anime",
            "schema": {
              "type": "string",
              "example": "lgrhzon-episode-1-sub-indo"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Berhasil mengambil detail episode",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "Ok"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "episode": {
                          "type": "string",
                          "example": "Log Horizon Episode 1 Subtitle Indonesia"
                        },
                        "anime": {
                          "type": "object",
                          "properties": {
                            "slug": {
                              "type": "string",
                              "example": "log-horiz-subtitle-indonesia"
                            },
                            "otakudesu_url": {
                              "type": "string",
                              "example": "https://otakudesu.cloud/anime/log-horiz-subtitle-indonesia/"
                            }
                          }
                        },
                        "has_next_episode": {
                          "type": "boolean",
                          "example": true
                        },
                        "next_episode": {
                          "type": "object",
                          "properties": {
                            "slug": {
                              "type": "string",
                              "example": "lgrhzon-episode-2-sub-indo"
                            },
                            "otakudesu_url": {
                              "type": "string",
                              "example": "https://otakudesu.cloud/episode/lgrhzon-episode-2-sub-indo/"
                            }
                          }
                        },
                        "has_previous_episode": {
                          "type": "boolean",
                          "example": false
                        },
                        "previous_episode": {
                          "type": "string",
                          "nullable": true,
                          "example": null
                        },
                        "stream_url": {
                          "type": "string",
                          "example": "https://desudrive.com/dstream/playdesu/index.php?id=NStDZzRCRmpmeWRsRFRCOGNrZU16M2loQ2FvSWJHcS9tKzJ1c2FSMWNLMD0="
                        },
                        "download_urls": {
                          "type": "object",
                          "properties": {
                            "mp4": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "resolution": {
                                    "type": "string",
                                    "example": "360p"
                                  },
                                  "urls": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "provider": {
                                          "type": "string",
                                          "example": "ZippyShare"
                                        },
                                        "url": {
                                          "type": "string",
                                          "example": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVmNVNPQ2x6WmpBNnVjZWFhV2pNTzVqeXhTY2VybmhtUURuVld0bjM0YitsaFVBczZxOFpHL2pRPT0="
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "mkv": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "resolution": {
                                    "type": "string",
                                    "example": "360p"
                                  },
                                  "urls": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "provider": {
                                          "type": "string",
                                          "example": "ZippyShare"
                                        },
                                        "url": {
                                          "type": "string",
                                          "example": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVmNVNPQ2x6WmpBNnVjZWFhV2pNTzVqeXhTY2VybmhtUURuVld0bjM0YitsaFVBczZxOFpHL2pRPT0="
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Episode tidak ditemukan",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "Error"
                    },
                    "message": {
                      "type": "string",
                      "example": "Episode not found"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/anime/detail/{slug}": {
      "get": {
        "summary": "Dapatkan Detail Log Horizon",
        "description": "Mendapatkan detail dari anime Log Horizon dengan subtitle Indonesia.",
        "tags": [
          "anime"
        ],
        "parameters": [
          {
            "name": "slug",
            "in": "path",
            "required": true,
            "description": "Slug untuk halaman anime.",
            "schema": {
              "type": "string",
              "example": "log-horiz-subtitle-indonesia"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Detail anime Log Horizon berhasil diambil.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "Ok"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "title": {
                          "type": "string",
                          "example": "Log Horizon"
                        },
                        "japanese_title": {
                          "type": "string",
                          "example": "ログ・ホライズン"
                        },
                        "poster": {
                          "type": "string",
                          "example": "https://otakudesu.cloud/wp-content/uploads/2019/03/Log-Horizon-Sub-Indo.jpg"
                        },
                        "rating": {
                          "type": "string",
                          "example": "8.10"
                        },
                        "produser": {
                          "type": "string",
                          "example": "NHK"
                        },
                        "type": {
                          "type": "string",
                          "example": "BD"
                        },
                        "status": {
                          "type": "string",
                          "example": "Completed"
                        },
                        "episode_count": {
                          "type": "string",
                          "example": "25"
                        },
                        "duration": {
                          "type": "string",
                          "example": "25 Menit"
                        },
                        "release_date": {
                          "type": "string",
                          "example": "Oct 5, 2013"
                        },
                        "studio": {
                          "type": "string",
                          "example": "Satelight"
                        },
                        "genres": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string",
                                "example": "Action"
                              },
                              "slug": {
                                "type": "string",
                                "example": "action"
                              },
                              "otakudesu_url": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/genres/action/"
                              }
                            }
                          }
                        },
                        "synopsis": {
                          "type": "string",
                          "example": "Berlatar di sebuah game MMORPG bernama Elder Tale..."
                        },
                        "batch": {
                          "type": "object",
                          "properties": {
                            "slug": {
                              "type": "string",
                              "example": "lgrhzon-batch-sub-indo"
                            },
                            "otakudesu_url": {
                              "type": "string",
                              "example": "https://otakudesu.cloud/batch/lgrhzon-batch-sub-indo/"
                            },
                            "uploaded_on": {
                              "type": "string",
                              "example": "Dec 10, 2019"
                            }
                            


                          },
                        },
                        "episode_lists": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "episode": {
                                "type": "string",
                                "example": "Log Horizon Episode 1 Subtitle Indonesia"
                              },
                              "slug": {
                                "type": "string",
                                "example": "lgrhzon-episode-1-sub-indo"
                              },
                              "otakudesu_url": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/episode/lgrhzon-episode-1-sub-indo/"
                              }
                            }
                          }
                        },
                        "recommendations": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "title": {
                                "type": "string",
                                "example": "Momochi-san Chi no Ayakashi Ouji"
                              },
                              "slug": {
                                "type": "string",
                                "example": "momochisan-sub-indo"
                              },
                              "poster": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/wp-content/uploads/2024/08/Momochi-san-Chi-no-Ayakashi-Ouji-Sub-Indo.jpg"
                              },
                              "otakudesu_url": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/anime/momochisan-sub-indo/"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/anime/search": {
      "get": {
        "summary": "Cari anime berdasarkan kueri",
        "tags": [
          "anime"
        ],
        "parameters": [
          {
            "name": "q",
            "example": "naruto",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "Kueri pencarian untuk anime"
          }
        ],
        "responses": {
          "200": {
            "description": "Respon sukses",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "Ok"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "type": "string",
                            "example": "Boruto: Naruto Next Generations Subtitle Indonesia"
                          },
                          "slug": {
                            "type": "string",
                            "example": "borto-sub-indo"
                          },
                          "poster": {
                            "type": "string",
                            "example": "https://otakudesu.cloud/wp-content/uploads/2020/05/Boruto-Sub-Indo.jpg"
                          },
                          "genres": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "Action"
                                },
                                "slug": {
                                  "type": "string",
                                  "example": "action"
                                },
                                "otakudesu_url": {
                                  "type": "string",
                                  "example": "https://otakudesu.cloud/genres/action/"
                                }
                              }
                            }
                          },
                          "status": {
                            "type": "string",
                            "example": "Ongoing"
                          },
                          "rating": {
                            "type": "string",
                            "example": "6.15"
                          },
                          "url": {
                            "type": "string",
                            "example": "https://otakudesu.cloud/anime/borto-sub-indo/"
                          }
                        }
                      }
                    }
                  }
                },
                "example": {
                  "status": "Ok",
                  "data": [
                    {
                      "title": "Boruto: Naruto Next Generations Subtitle Indonesia",
                      "slug": "borto-sub-indo",
                      "poster": "https://otakudesu.cloud/wp-content/uploads/2020/05/Boruto-Sub-Indo.jpg",
                      "genres": [
                        {
                          "name": "Action",
                          "slug": "action",
                          "otakudesu_url": "https://otakudesu.cloud/genres/action/"
                        },
                        {
                          "name": "Adventure",
                          "slug": "adventure",
                          "otakudesu_url": "https://otakudesu.cloud/genres/adventure/"
                        },
                        {
                          "name": "Martial Arts",
                          "slug": "martial-arts",
                          "otakudesu_url": "https://otakudesu.cloud/genres/martial-arts/"
                        },
                        {
                          "name": "Shounen",
                          "slug": "shounen",
                          "otakudesu_url": "https://otakudesu.cloud/genres/shounen/"
                        },
                        {
                          "name": "Super Power",
                          "slug": "super-power",
                          "otakudesu_url": "https://otakudesu.cloud/genres/super-power/"
                        }
                      ],
                      "status": "Ongoing",
                      "rating": "6.15",
                      "url": "https://otakudesu.cloud/anime/borto-sub-indo/"
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/api/anime/genre/{genre}": {
      "get": {
        "summary": "Dapatkan daftar anime berdasarkan genre",
        "tags": [
          "anime"
        ],
        "parameters": [
          {
            "name": "genre",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "example": "fantasy"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Daftar anime berdasarkan genre",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "Ok"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "anime": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "title": {
                                "type": "string",
                                "example": "Momochi-san Chi no Ayakashi Ouji"
                              },
                              "slug": {
                                "type": "string",
                                "example": "momochisan-sub-indo"
                              },
                              "poster": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/wp-content/uploads/2024/08/Momochi-san-Chi-no-Ayakashi-Ouji-Sub-Indo.jpg"
                              },
                              "rating": {
                                "type": "string",
                                "example": "6.49"
                              },
                              "episode_count": {
                                "type": "string",
                                "example": "12"
                              },
                              "season": {
                                "type": "string",
                                "example": "Winter 2024"
                              },
                              "studio": {
                                "type": "string",
                                "example": "Drive"
                              },
                              "genres": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "type": "string",
                                      "example": "Fantasy"
                                    },
                                    "slug": {
                                      "type": "string",
                                      "example": "fantasy"
                                    },
                                    "otakudesu_url": {
                                      "type": "string",
                                      "example": "https://otakudesu.cloud/genres/fantasy/"
                                    }
                                  }
                                }
                              },
                              "synopsis": {
                                "type": "string",
                                "example": "Himari Momochi yang baru saja berulang tahun ke-16 mendapatkan sebuah surat wasiat yang menyebutkan bahwa ia mewarisi sebuah rumah milik keluarga Hyakusenke."
                              },
                              "otakudesu_url": {
                                "type": "string",
                                "example": "https://otakudesu.cloud/anime/momochisan-sub-indo/"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  info: {
    title: 'Freefire',
    version: '9.9.9',
    description: 'api gratis'
  },
  servers: [
    {
      url: 'https://asepharyana.my.id',
      description: 'Produksi'
    },
    {
      url: 'http://localhost:3090',
      description: 'Pengembangan'
    }
  ]
};

export default OpenApiJson;