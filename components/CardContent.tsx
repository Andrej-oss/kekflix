import { ArrowLeftIcon } from "@heroicons/react/outline";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Movie } from "../models/movie";
import { CardItem } from "./index";

function CardContent({
                       title,
                       movies
                     }: { title: string, movies: Movie[] }) {
  const refCardItem = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const onClickArrow = (direction: string) => {
    setIsMoved(true);

    if (refCardItem.current) {
      const { scrollLeft, clientWidth } = refCardItem.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      refCardItem.current.scrollTo({left: scrollTo, behavior: 'smooth'});
    }
    setIsMoved(false);
  }

  return (
      <div className="h-40 space-y-0.5 md:space-y-2 md:m-5 lg:m-6">
        <h1 className="w-56  font-semibold text-sm cursor-pointer text-[#e5e5e5] transition duration-200
        hover:text-white md:text-xl">
          {title}
        </h1>
        <div className="group relative md:-ml-2">
          <ArrowLeftIcon className={`absolute z-50 w-8 h-8 opacity-0 group-hover:opacity-100 hover:scale-125 transition
          cursor-pointer m-auto top-0 left-2 bottom-0`} onClick={() => onClickArrow('left')}/>
          <div ref={refCardItem}
               className="flex items-center no-scrollbar space-x-0.5 transition duration-400 overflow-x-scroll
                md:space-x-2.5 md:p-2">
            { movies && movies.map(movie => <CardItem key={movie.id} movie={movie}/>)}
          </div>
          <ArrowRightIcon className={`absolute z-50 w-8 bottom-0 h-8 opacity-0 group-hover:opacity-100 hover:scale-125
           transition cursor-pointer m-auto top-0 right-2`} onClick={() => onClickArrow('right')}/>
        </div>
      </div>
  );
}

export default CardContent;