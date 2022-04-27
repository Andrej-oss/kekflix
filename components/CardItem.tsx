import { Movie } from "../models/movie";
import Image from 'next/image';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
function CardItem({ movie } : {movie: Movie}) {
  return (
      <div className="relative h-28 min-w-[180px] cursor-pointer transition
      duration-300 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image layout="fill"
               className="rounded-sm object-fill md:rounded"
               src={`${imageBaseUrl}${movie.backdrop_path || movie?.poster_path}`}
               unoptimized/>
      </div>
  );
}

export default CardItem;