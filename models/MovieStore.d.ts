import { Movie } from "./movie";

export interface MovieStore {
  page: number,
  results: Movie[],
  total_pages: number,
}

export interface initMoviesStore extends MovieStore{
  page: 0,
  results: [],
  total_pages: 0
}