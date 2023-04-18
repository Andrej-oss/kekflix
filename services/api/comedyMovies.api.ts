import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../../models/MovieStore";
import requests from "../../utils/requests";
import comedyMoviesSlice from "../slices/comedyMovies.slice";

const comedyApi = createApi({
  reducerPath: 'comedy',
  tagTypes: ["Comedy"],
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getComedyMovies: build.query<MovieStore, {page: number}>({
      query: ({page}) => `${requests.fetchComedyMovies}&page=${page}`
    })
  })
});

export default comedyApi;
export const comedyMoviesReducer = comedyMoviesSlice.reducer;
export const { getComedyMoviesFailure, getComedyMoviesSuccess, getComedyMoviesStart } = comedyMoviesSlice.actions;

export const { useGetComedyMoviesQuery } = comedyApi;