import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import requests from "../../utils/requests";
import {MovieStore} from "../../models/MovieStore";
import documentaryMoviesSlice from "../slices/documentaryMovies.slice";

const documentaryApi = createApi({
  reducerPath: 'documentary',
  tagTypes: ["Documentary"],
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getDocumentaryMovies: build.query<MovieStore, {page: number}>({
      query: ({page}) => `${requests.fetchDocumentaries}&page=${page}`
    })
  })
});

export default documentaryApi;
export const documentaryMoviesReducer = documentaryMoviesSlice.reducer;
export const { getDocumentaryMoviesSuccess, getDocumentaryMoviesStart, getDocumentaryMoviesFailure } = documentaryMoviesSlice.actions;

export const { useGetDocumentaryMoviesQuery } = documentaryApi;