import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../models/MovieStore";
import requests from "../utils/requests";
 const topRateApi = createApi({
  reducerPath: 'topRated',
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getTopRateMovies: build.query<MovieStore, null>({
      query: () => requests.fetchTopRated
    })
  })
});

 export default topRateApi;

export const { useGetTopRateMoviesQuery } = topRateApi;