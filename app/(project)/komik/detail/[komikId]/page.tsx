import { getData } from '@/lib/GetData';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ButtonBaris from '@/components/ButtonBaris';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { PRODUCTION, BaseUrl } from '@/lib/url';

interface MangaDetail {
  title: string;
  alternativeTitle: string;
  image: string;
  score: string;
  description: string;
  status: string;
  type: string;
  releaseDate: string;
  author: string;
  artist: string;
  serialization: string;
  postedBy: string;
  postedOn: string;
  updatedOn: string;
  genres: string[];
  chapters: {
    chapter: string;
    date: string;
    chapter_id: string;
  }[];
}

interface DetailPageProps {
  params: {
    komikId: string;
  };
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { komikId } = params;
  const manga: MangaDetail = await getData(`${BaseUrl}/api/komik/detail?komik_id=${komikId}`);

  if (!manga) {
    notFound();
  }

  return {
    title: manga.title,
    description: manga.description,
    keywords: `nextjs, manga, manhua, manhwa, Baca online One Piece, Baca Online Solo Leveling, Baca Online Apotheosis, Baca Online Star Martial God Technique, Baca Komik lengkap, Baca Manga, Baca Manhua, Baca Manhwa, Baca Komik Naruto, Baca Komik Bleach, Baca Komik One Piece, Baca Komik Boruto, Baca Komik Dragon Ball, Baca Komik Black Clover, Baca Komik Attack on Titan, Baca Komik Fairy Tail, Baca Komik My Hero Academia, Baca Komik Demon Slayer, Baca Komik Jujutsu Kaisen, Baca Komik Tokyo Revengers, Baca Komik Hunter x Hunter, Baca Manhua Martial Peak, Baca Manhua Tales of Demons and Gods, Baca Manhua The Great Ruler, Baca Manhwa Solo Leveling, Baca Manhwa The Beginning After The End, Baca Manhwa Tower of God, Baca Manhwa Noblesse, Baca Manhwa The God of High School, Komik Gratis, Komik Terbaru, Baca Komik Bahasa Indonesia, Baca Manga Bahasa Indonesia, Baca Manhua Bahasa Indonesia, Baca Manhwa Bahasa Indonesia, Manga Sub Indo, Manhua Sub Indo, Manhwa Sub Indo, Baca Komik Sub Indo, Manga Terjemahan, Manhua Terjemahan, Manhwa Terjemahan, Baca Komik Online, Komik Terjemahan, Baca Komik di HP, Komik Digital, Manga Terpopuler, Manhua Terpopuler, Manhwa Terpopuler, ${manga.title}`,
    openGraph: {
      title: manga.title,
      description: manga.description,
      images: [manga.image],
      url: `http://${PRODUCTION}/komik/detail/${komikId}`
    },
    twitter: {
      card: 'summary_large_image',
      title: manga.title,
      description: manga.description,
      images: [manga.image]
    }
  };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { komikId } = params;
  const manga: MangaDetail = await getData(`${BaseUrl}/api/komik/detail?komik_id=${komikId}`);

  if (!manga) {
    notFound();
  }

  return (
    <main className="p-6 bg-background dark:bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-dark rounded-lg shadow-lg">
      <BackgroundGradient className="rounded-[22px] p-7 bg-white dark:bg-zinc-900">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center md:justify-start">
            <Image
              src={manga.image}
              alt={manga.title}
              width={330}
              height={450}
              className="object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-2/3 md:pl-6">
            <h1 className="text-3xl font-bold mb-4 text-primary-dark dark:text-primary">{manga.title}</h1>
            <div className="text-gray-800 dark:text-gray-200 mb-4">
              <p className="mb-2">
                <strong>Alternative Title:</strong> {manga.alternativeTitle}
              </p>
              <p className="mb-2">
                <strong>Score:</strong> {manga.score}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {manga.status}
              </p>
              <p className="mb-2">
                <strong>Author:</strong> {manga.author}
              </p>
              <p className="mb-2">
                <strong>Type:</strong> {manga.type}
              </p>
              <p className="mb-2">
                <strong>Release Date:</strong> {manga.releaseDate}
              </p>
              <p className="mb-4">
                <strong>Genres:</strong> {manga.genres ? manga.genres.join(', ') : 'N/A'}
              </p>
              <p className="mb-4">
                <strong>Description:</strong> {manga.description}
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2 text-primary-dark dark:text-primary">Chapters</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {manga.chapters && Array.isArray(manga.chapters) && manga.chapters.length > 0 ? (
                  manga.chapters.map((chapter) => (
                    <Link scroll key={chapter.chapter_id} href={`/komik/chapter/${chapter.chapter_id}`} className="">
                      <ButtonBaris>
                        <span className="text-lg font-bold mb-1 text-center truncate text-primary-dark dark:text-primary">{chapter.chapter}</span>
                        <span className="text-sm text-center truncate text-gray-500 dark:text-gray-400">{chapter.date}</span>
                      </ButtonBaris>
                    </Link>
                  ))
                ) : (
                  <p className="col-span-full text-center text-primary-dark dark:text-primary">No chapters available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        </BackgroundGradient>
      </div>
    </main>
  );
}
