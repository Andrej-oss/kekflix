import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../../models/MovieStore";
import requests from "../../utils/requests";
import horrorMoviesSlice from "../slices/horrorMovies.slice";

const horrorApi = createApi({
  reducerPath: 'horror',
  tagTypes: ["Horror"],
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getHorrorMovies: build.query<MovieStore, {page: number}>({
      query: ({page}) => `${requests.fetchHorrorMovies}&page=${page}`
    })
  })
});

export default horrorApi;
export const horrorMoviesReducer = horrorMoviesSlice.reducer;
export const { getHorrorMoviesFailure, getHorrorMoviesSuccess, getHorrorMoviesStart } = horrorMoviesSlice.actions;

export const { useGetHorrorMoviesQuery } = horrorApi;