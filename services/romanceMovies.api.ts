import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../models/MovieStore";
import requests from "../utils/requests";

const romanceApi = createApi({
  reducerPath: 'romance',
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getRomanceMovies: build.query<MovieStore, null>({
      query: () => requests.fetchRomanceMovies
    })
  })
});

export default romanceApi;

export const { useGetRomanceMoviesQuery } = romanceApi;