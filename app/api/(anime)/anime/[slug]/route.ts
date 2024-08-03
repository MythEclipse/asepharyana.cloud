import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'https://otakudesu.cloud';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const [, , type, slug, ...rest] = pathname.split('/');

  try {
    let url = '';

    switch (type) {
      case 'home':
        url = `${BASE_URL}/`;
        break;
      case 'ongoing-anime':
        url = `${BASE_URL}/ongoing-anime/${rest[0] || ''}`;
        break;
      case 'complete-anime':
        url = `${BASE_URL}/complete-anime/${rest[0] || ''}`;
        break;
      case 'search':
        url = `${BASE_URL}/search/${rest.join('/')}`; // Use join to handle multiple search terms
        break;
      case 'anime':
        if (rest.length === 0) {
          url = `${BASE_URL}/anime/${slug}`;
        } else if (rest[0] === 'episodes') {
          url = `${BASE_URL}/anime/${slug}/episodes`;
        } else {
          url = `${BASE_URL}/anime/${slug}/episodes/${rest[0]}`;
        }
        break;
      case 'episode':
        url = `${BASE_URL}/episode/${slug}`;
        break;
      case 'genres':
        if (rest.length === 0) {
          url = `${BASE_URL}/genres`;
        } else {
          url = `${BASE_URL}/genres/${rest[0]}`;
        }
        break;
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 }); // Return 404 for invalid endpoint
    }

    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 }); // Return 500 with error message
  }
}