import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

// Define schemas
const MangaDataSchema = z.object({
  title: z.string(),
  image: z.string(),
  chapter: z.string(),
  score: z.string(),
  type: z.string(),
  komik_id: z.string()
});

const MangaDetailSchema = z.object({
  title: z.string(),
  alternativeTitle: z.string(),
  score: z.string(),
  image: z.string(),
  description: z.string(),
  status: z.string(),
  type: z.string(),
  releaseDate: z.string(),
  author: z.string(),
  totalChapter: z.string(),
  updatedOn: z.string(),
  genres: z.array(z.string()),
  chapters: z.array(
    z.object({
      chapter: z.string(),
      date: z.string(),
      chapter_id: z.string()
    })
  )
});

const MangaChapterSchema = z.object({
  title: z.string(),
  next_chapter_id: z.string(),
  prev_chapter_id: z.string(),
  images: z.array(z.string())
});

const ErrorResponseSchema = z.object({
  message: z.string()
});

// Define the API contract
export const contract = c.router({
  fetchMangaList: {
    method: 'GET',
    path: '/api/komik/manga',
    query: z.object({
      page: z.string(),
      order: z.enum(['update', 'popular', 'titleasc', 'titledesc']).optional()
    }),
    responses: {
      200: z.object({
        data: z.array(MangaDataSchema),
        prevPage: z.boolean(),
        nextPage: z.boolean()
      }),
      400: ErrorResponseSchema,
      500: ErrorResponseSchema
    },
    summary: 'Fetch a list of manga',
    description:
      'Fetches a list of manga based on type manga and other query parameters. Supports pagination and ordering.'
  },
  fetchmanhwaList: {
    method: 'GET',
    path: '/api/komik/manhwa',
    query: z.object({
      page: z.string(),
      order: z.enum(['update', 'popular', 'titleasc', 'titledesc']).optional()
    }),
    responses: {
      200: z.object({
        data: z.array(MangaDataSchema),
        prevPage: z.boolean(),
        nextPage: z.boolean()
      }),
      400: ErrorResponseSchema,
      500: ErrorResponseSchema
    },
    summary: 'Fetch a list of manhwa',
    description:
      'Fetches a list of manhwa based on type manhwa and other query parameters. Supports pagination and ordering.'
  },
  fetchmanhuaList: {
    method: 'GET',
    path: '/api/komik/manhua',
    query: z.object({
      page: z.string(),
      order: z.enum(['update', 'popular', 'titleasc', 'titledesc']).optional()
    }),
    responses: {
      200: z.object({
        data: z.array(MangaDataSchema),
        prevPage: z.boolean(),
        nextPage: z.boolean()
      }),
      400: ErrorResponseSchema,
      500: ErrorResponseSchema
    },
    summary: 'Fetch a list of manhua',
    description:
      'Fetches a list of manhua based on type manhua and other query parameters. Supports pagination and ordering.'
  },
  fetchsearchList: {
    method: 'GET',
    path: '/api/komik/search',
    query: z.object({
      query: z.string().optional() // Optional for search
    }),
    responses: {
      200: z.object({
        message: z.string(),
        data: z.array(MangaDataSchema)
      }),
      400: ErrorResponseSchema,
      500: ErrorResponseSchema
    },
    summary: 'Fetch a list of manga',
    description: 'Fetches a list of manga based on query'
  },

  fetchMangaDetail: {
    method: 'GET',
    path: '/api/komik/detail',
    query: z.object({
      komik_id: z.string()
    }),
    responses: {
      200: z.object({
        message: z.string(),
        data: MangaDetailSchema
      }),
      400: ErrorResponseSchema,
      500: ErrorResponseSchema
    },
    summary: 'Fetch manga details',
    description: 'Fetches details of a specific manga by its ID.'
  },

  fetchMangaChapter: {
    method: 'GET',
    path: '/api/komik/chapter',
    query: z.object({
      chapter_url: z.string()
    }),
    responses: {
      200: z.object({
        message: z.string(),
        data: MangaChapterSchema
      }),
      400: ErrorResponseSchema,
      500: ErrorResponseSchema
    },
    summary: 'Fetch manga chapter images',
    description: 'Fetches images for a specific manga chapter by its URL.'
  }
});
