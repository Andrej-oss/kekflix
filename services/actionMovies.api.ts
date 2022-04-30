import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../models/MovieStore";
import requests from "../utils/requests";

const actionApi = createApi({
  reducerPath: 'action',
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getActionMovies: build.query<MovieStore, null>({
      query: () => requests.fetchActionMovies
    })
  })
});

export default actionApi;

export const { useGetActionMoviesQuery } = actionApi;