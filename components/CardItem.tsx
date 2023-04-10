import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Movie } from "../models/movie";
import Image from 'next/image';
import {moviePosterUrl} from "../constants/movie";

function CardItem({ movie } : {movie: Movie}) {
  const [ showModal, setShowModal ] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
      <div
          onClick={() => {
        setShowModal(true);
        setCurrentMovie(movie);
      }}
          className="relative h-28 min-w-[180px] cursor-pointer transition
      duration-300 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image layout="fill"
               className="rounded-sm object-fill md:rounded"
               src={`${moviePosterUrl}${movie.backdrop_path || movie?.poster_path}`}
               unoptimized/>
          <p className="hidden hover:inline absolute">{movie.name}</p>
      </div>
  );
}

export default CardItem;