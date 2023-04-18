import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {MovieStore} from "../../models/MovieStore";
import requests from "../../utils/requests";
import {RootState} from "../../store/store";
import topRateMoviesSlice from "../slices/topRateMovies.slice";

const topRateApi = createApi({
    reducerPath: 'topRatedMoviesApi',
    tagTypes: ["TopRated"],
    baseQuery: fetchBaseQuery({baseUrl: requests.fetchTopRated}),
    endpoints: build => ({
        getTopRateMovies: build.query<MovieStore, { page: number }>({
            query: ({page}) => `&page=${page}`
        })
    })
});

export default topRateApi;

export const {useGetTopRateMoviesQuery} = topRateApi;
export const topRateMoviesReducer = topRateMoviesSlice.reducer;

// Экспорт дополнительных редюсеров и экшенов из среза (slice) хранилища фильмов
export const { getTopRateMoviesFailure, getTopRateMoviesSuccess, getTopRateMoviesStart } = topRateMoviesSlice.actions;

export const selectMovies = (state: RootState) => state.topRateMovies.results;
export const selectError = (state: RootState) => state.topRateMovies.error;