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
    path: '/api/komik/[type]',
    query: z.object({
      type: z.enum(['manga', 'manhwa', 'manhua', 'search']),
      page: z.string().optional(),
      order: z.enum(['update', 'popular','titleasc','titledesc']).optional(),
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
    description: 'Fetches a list of manga based on type (manga, manhwa, manhua, search) and other query parameters. Supports pagination and ordering. Example URLs:\n' +
      '- `/api/komik/manga?page=1&order=update`\n' +
      '- `/api/komik/manhua?page=1&order=update`\n' +
      '- `/api/komik/manhwa?page=1&order=update`'
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
    description: 'Fetches details of a specific manga by its ID. Example URL:\n' +
      '- `/api/komik/detail?komik_id=${komikId}`'
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
    description: 'Fetches images for a specific manga chapter by its URL. Example URL:\n' +
      '- `/api/komik/chapter?chapter_url=${chapterId}`'
  }
});
