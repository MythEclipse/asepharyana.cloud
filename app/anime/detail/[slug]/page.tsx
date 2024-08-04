import { getData } from '../../../../components/core/GetData/GetData';
import Image from 'next/image';

interface Genre {
  name: string;
  slug: string;
  otakudesu_url: string;
}

interface Batch {
  slug: string;
  otakudesu_url: string;
  uploaded_at: string;
}

interface Episode {
  episode: string;
  slug: string;
  otakudesu_url: string;
}

interface Recommendation {
  title: string;
  slug: string;
  poster: string;
  otakudesu_url: string;
}

interface AnimeData {
  status: string;
  data: {
    title: string;
    japanese_title: string;
    poster: string;
    rating: string;
    produser: string;
    type: string;
    status: string;
    episode_count: string;
    duration: string;
    release_date: string;
    studio: string;
    genres: Genre[];
    synopsis: string;
    batch: Batch;
    episode_lists: Episode[];
    recommendations: Recommendation[];
  };
}

interface DetailProductPageProps {
  params: {
    slug: string;
  };
}

export default async function DetailProductPage(props: DetailProductPageProps) {
  const { params } = props;
  const Anime: AnimeData = await getData(`${process.env.ANIME}/v1/anime/${params.slug}`);

  return (
    <div className="container mx-auto my-10 flex items-center">
      <div className="mx-auto w-1/2 border border-darkb">
        <Image
          className="col-span-2 aspect-square w-full object-cover"
          src={Anime.data.poster}
          alt={Anime.data.title}
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="x-6 bg-white p-4">
          <h3>{Anime.data.title}</h3>
          <p>Rating : {Anime.data.rating}</p>
        </div>
      </div>
    </div>
  );
}
