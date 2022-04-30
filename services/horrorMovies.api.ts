import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../models/MovieStore";
import requests from "../utils/requests";

const horrorApi = createApi({
  reducerPath: 'horror',
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getHorrorMovies: build.query<MovieStore, null>({
      query: () => requests.fetchHorrorMovies
    })
  })
});

export default horrorApi;

export const { useGetHorrorMoviesQuery } = horrorApi;