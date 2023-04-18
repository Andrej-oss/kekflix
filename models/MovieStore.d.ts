import { Movie } from "./movie";
import {Product} from "./product";

export interface MovieStore {
  page: number,
  results: Movie[],
  productsResults: Product[],
  total_pages: number,
  error?: string | null,
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface initMoviesStore extends MovieStore{
  page: 0,
  results: [],
  productsResults: [],
  total_pages: 0
}