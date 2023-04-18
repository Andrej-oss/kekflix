import { useGetActionMoviesQuery } from "../../services/api/actionMovies.api";
import { useGetComedyMoviesQuery } from "../../services/api/comedyMovies.api";
import { useGetDocumentaryMoviesQuery } from "../../services/api/documentaryMovies.api";
import { useGetHorrorMoviesQuery } from "../../services/api/horrorMovies.api";
import { useGetRomanceMoviesQuery } from "../../services/api/romanceMovies.api";
import { useGetTopRateMoviesQuery } from "../../services/api/topRateMovies.api";
import {useGetProductsQuery} from "../../services/api/products.api";

export const movieHook = {
  useGetDocumentaryMoviesQuery,
  useGetComedyMoviesQuery,
  useGetHorrorMoviesQuery,
  useGetRomanceMoviesQuery,
  useGetActionMoviesQuery,
  useGetTopRateMoviesQuery,
  useGetProductsQuery
}