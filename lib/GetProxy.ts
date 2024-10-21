import axios, { AxiosRequestConfig } from 'axios';

const proxyUrl = 'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/http.txt';

// Header default untuk setiap request
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

const getRandomProxy = async (): Promise<string | undefined> => {
  try {
    const response = await axios.get(proxyUrl);
    const proxies = response.data.split('\n').filter(Boolean);
    if (proxies.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * proxies.length);
    return proxies[randomIndex];
  } catch (error) {
    console.error('Failed to fetch proxy list:', error);
    return undefined;
  }
};

export const axiosWithProxy = async (url: string, config?: AxiosRequestConfig) => {
  const proxy = await getRandomProxy();

  if (proxy) {
    const [host, port] = proxy.trim().split(':');

    const proxyConfig = {
      ...config,
      headers: {
        ...DEFAULT_HEADERS,
        ...config?.headers // Jika ada header tambahan dari konfigurasi
      },
      proxy: {
        host,
        port: parseInt(port, 10)
      }
    };

    try {
      const response = await axios.get(url, proxyConfig);
      return response.data;
    } catch (error) {
      console.error('Request failed with proxy:', error);
      throw error;
    }
  } else {
    throw new Error('No valid proxy found');
  }
};
