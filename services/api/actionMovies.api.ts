import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../../models/MovieStore";
import requests from "../../utils/requests";
import actionMoviesSlice from "../slices/actionMovies.slice";
import {RootState} from "../../store/store";

const actionApi = createApi({
  reducerPath: 'action',
  tagTypes: ["Action"],
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getActionMovies: build.query<MovieStore, {page: number}>({
      query: ({page}) => `${requests.fetchActionMovies}&page=${page}`
    })
  })
});

export default actionApi;
export const actionMoviesReducer = actionMoviesSlice.reducer;
export const { getActionMoviesSuccess, getActionMoviesStart, getActionMoviesFailure } = actionMoviesSlice.actions;
export const { useGetActionMoviesQuery } = actionApi;
export const selectActionMovies = (state: RootState) => state.actionMovies.results;