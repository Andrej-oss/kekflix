import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../../models/MovieStore";
import requests from "../../utils/requests";
import romanceMoviesSlice from "../slices/romanceMovies.slice";

const romanceApi = createApi({
  reducerPath: 'romance',
  tagTypes: ["Romance"],
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getRomanceMovies: build.query<MovieStore, {page: number}>({
      query: ({page}) => `${requests.fetchRomanceMovies}&page=${page}`
    })
  })
});

export default romanceApi;
export const romanceMoviesReducer = romanceMoviesSlice.reducer;
export const { getRomanceMoviesSuccess, getRomanceMoviesFailure, getRomanceMoviesStart } = romanceMoviesSlice.actions;

export const { useGetRomanceMoviesQuery } = romanceApi;