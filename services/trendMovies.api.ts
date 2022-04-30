import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../models/MovieStore";
import requests from "../utils/requests";

const trendMoviesApi = createApi({
  reducerPath: "trendedMovies",
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getTrendedMovies: build.query<MovieStore, null>({
      query: () => requests.fetchTrending
    })
  })
});

export default trendMoviesApi;

export const {
  useGetTrendedMoviesQuery
} = trendMoviesApi;