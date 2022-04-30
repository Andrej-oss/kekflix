import { Movie } from "./movie";

export interface Props {
  netflixOriginals: Movie[],
  trending: Movie[],
  topRate: Movie[],
  actionMovie: Movie[],
  comedyMovie: Movie[],
  horrorMovie: Movie[],
  romanceMovie: Movie[],
  documentarie: Movie[]
}