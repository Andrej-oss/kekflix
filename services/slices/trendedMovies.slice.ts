import {createSlice} from "@reduxjs/toolkit";
import {MovieStore} from "../../models/MovieStore";

const trendedMoviesSlice = createSlice({
    name: 'TrendedMovies',
    initialState: {
        results: [],
        page: 1,
        total_pages: 0,
        status: 'idle',
        error: null,
        productsResults: []
    } as MovieStore,
    reducers: {
        // Определение редюсеров для обработки действий, связанных с фильмами
        getTrendedMoviesStart: (state) => {
            state.status = 'loading';
        },
        getTrendedMoviesSuccess: (state, action) => {
            state.status = 'succeeded';
            state.results = state.results.concat(action.payload.results);
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
        },
        getTrendedMoviesFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export default trendedMoviesSlice;