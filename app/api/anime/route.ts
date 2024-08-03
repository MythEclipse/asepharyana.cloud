import { NextResponse } from 'next/server';
import cheerio from 'cheerio';
import axios from 'axios';

// Fungsi untuk mengambil data dari satu halaman
async function fetchPageData(pageNumber: number) {
    try {
        // Mengambil data dari halaman yang diberikan
        const response = await axios.get(`https://otakudesu.cloud/complete-anime/page/${pageNumber}/`);
        const $ = cheerio.load(response.data);

        // Mengambil informasi anime yang terdaftar
        const animeList: { title: string, episode: string, date: string, image: string | undefined, link: string | undefined }[] = [];
        $('.detpost').each((i, element) => {
            const title = $(element).find('.jdlflm').text().trim();
            const episode = $(element).find('.epz').text().trim();
            const date = $(element).find('.newnime').text().trim();
            const image = $(element).find('img').attr('src');
            const link = $(element).find('a').attr('href');

            animeList.push({
                title,
                episode,
                date,
                image,
                link
            });
        });

        return animeList;
    } catch (error) {
        console.error(`Error fetching page ${pageNumber}:`, error);
        return [];
    }
}

// Fungsi untuk mengambil data dari halaman detail anime
async function fetchAnimeDetails(animeLink: string) {
    try {
        // Mengambil data dari halaman detail anime
        const response = await axios.get(animeLink);
        const $ = cheerio.load(response.data);

        // Mengambil informasi tambahan jika diperlukan
        const details = {
            synopsis: $('#synopsis').text().trim(), // Misalnya, mengambil sinopsis
            // Tambahkan field lain sesuai kebutuhan
        };

        return details;
    } catch (error) {
        console.error(`Error fetching details for ${animeLink}:`, error);
        return {};
    }
}

// Fungsi utama untuk mengambil data dari semua halaman
export async function GET() {
    try {
        const allAnimeList: { title: string, episode: string, date: string, image: string | undefined, link: string | undefined, details?: any }[] = [];
        let pageNumber = 1;
        let hasMorePages = true;

        while (hasMorePages) {
            const pageData = await fetchPageData(pageNumber);
            if (pageData.length === 0) {
                hasMorePages = false;
            } else {
                // Mengambil data detail untuk setiap anime
                for (const anime of pageData) {
                    if (anime.link) {
                        const details = await fetchAnimeDetails(anime.link);
                        allAnimeList.push({
                            ...anime,
                            details
                        });
                    } else {
                        allAnimeList.push(anime);
                    }
                }
                pageNumber += 1;
            }
        }

        // Mengembalikan data anime dalam format JSON
        return NextResponse.json({
            animeList: allAnimeList
        });
    } catch (error) {
        // Menangani kesalahan
        console.error('Error:', error);
        return NextResponse.error();
    }
}
