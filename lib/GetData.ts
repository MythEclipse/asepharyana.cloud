import axios from 'axios';

// Function to fetch data using axios
export async function getData(url: string) {
  try {
    const DEFAULT_HEADERS = {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'sec-ch-ua-mobile': '?0',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    };

    const axiosInstance = axios.create({
      headers: DEFAULT_HEADERS
    });
    const res = await axiosInstance.get(url);

    // Check for successful status codes (200-299)
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching data with Axios:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Function to fetch data using fetch
export async function getDataNext(url: string) {
  const DEFAULT_HEADERS = {
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
  };

  try {
    const res = await fetch(url, {
      headers: DEFAULT_HEADERS,
      method: 'GET',
      next: { revalidate: 3600 }, // Ensure this is supported in your environment
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching data with fetch:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
