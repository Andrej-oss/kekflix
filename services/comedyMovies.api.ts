import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../models/MovieStore";
import requests from "../utils/requests";

const comedyApi = createApi({
  reducerPath: 'comedy',
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getComedyMovies: build.query<MovieStore, null>({
      query: () => requests.fetchComedyMovies
    })
  })
});

export default comedyApi;

export const { useGetComedyMoviesQuery } = comedyApi;