// contract.ts

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
    path: '/api/komik',
    query: z.object({
      type: z.enum(['manga', 'manhwa', 'manhua', 'search']),
      page: z.string().optional(),
      order: z.enum(['update', 'latest']).optional()
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
    description: 'Fetches a list of manga based on type and other query parameters.'
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
