import {createSlice} from "@reduxjs/toolkit";
import {MovieStore} from "../../models/MovieStore";

const romanceMoviesSlice = createSlice({
    name: "RomanceMoviesSlice",
    initialState: {
        results: [],
        page: 1,
        productsResults: [],
        total_pages: 1,
        error: null,
        status: "idle"
    } as MovieStore,
    reducers: {
        getRomanceMoviesStart: (state) => {
            state.status = "loading"
        },
        getRomanceMoviesSuccess: (state, action) => {
            state.status = "succeeded";
            state.results = state.results.concat(action.payload.results);
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
        },
        getRomanceMoviesFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    }
});

export default romanceMoviesSlice;