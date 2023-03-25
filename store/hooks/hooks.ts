import { useGetActionMoviesQuery } from "../../services/actionMovies.api";
import { useGetComedyMoviesQuery } from "../../services/comedyMovies.api";
import { useGetDocumentaryMoviesQuery } from "../../services/documentaryMovies.api";
import { useGetHorrorMoviesQuery } from "../../services/horrorMovies.api";
import { useGetRomanceMoviesQuery } from "../../services/romanceMovies.api";
import { useGetTopRateMoviesQuery } from "../../services/topRateMovies.api";
import { useGetTrendedMoviesQuery } from "../../services/trendMovies.api";
import {useGetProductsQuery} from "../../services/products.api";

export const movieHook = {
  useGetDocumentaryMoviesQuery,
  useGetComedyMoviesQuery,
  useGetHorrorMoviesQuery,
  useGetRomanceMoviesQuery,
  useGetActionMoviesQuery,
  useGetTopRateMoviesQuery,
  useGetTrendedMoviesQuery,
  useGetProductsQuery
}