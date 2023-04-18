import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieStore } from "../../models/MovieStore";
import requests from "../../utils/requests";
import {RootState} from "../../store/store";
import trendedMoviesSlice from "../slices/trendedMovies.slice";

const trendMoviesApi = createApi({
  reducerPath: "trendedMoviesApi",
  tagTypes: ["Trends"],
  baseQuery: fetchBaseQuery({baseUrl: requests.fetchTrending}),
  endpoints: build => ({
    getTrendedMovies: build.query<MovieStore, {page: number}>({
      query: ({page}) => `&page=${page}`
    })
  })
});

export default trendMoviesApi;

export const {
  useGetTrendedMoviesQuery
} = trendMoviesApi;

export const trendedMoviesReducer = trendedMoviesSlice.reducer;

// Экспорт дополнительных редюсеров и экшенов из среза (slice) хранилища фильмов
export const { getTrendedMoviesStart, getTrendedMoviesFailure, getTrendedMoviesSuccess  } = trendedMoviesSlice.actions;

export const selectMovies = (state: RootState) => state.trendedMovies.results;
export const selectError = (state: RootState) => state.trendedMovies.error;