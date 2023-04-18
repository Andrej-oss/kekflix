import {createSlice} from "@reduxjs/toolkit";
import {MovieStore} from "../../models/MovieStore";

const topRateMoviesSlice = createSlice({
    name: "TopRateMovies",
    initialState: {
        results: [],
        page: 1,
        productsResults: [],
        total_pages: 1,
        error: null,
        status: "idle"
    } as MovieStore,
    reducers: {
        getTopRateMoviesStart: (state) => {
            state.status = "loading"
        },
        getTopRateMoviesSuccess: (state, action) => {
            state.status = "succeeded";
            state.results = state.results.concat(action.payload.results);
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
        },
        getTopRateMoviesFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    }
});

export default topRateMoviesSlice;