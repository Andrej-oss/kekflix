import {createSlice} from "@reduxjs/toolkit";
import {MovieStore} from "../../models/MovieStore";

const actionMoviesSlice = createSlice({
    name: "ActionMoviesSlice",
    initialState: {
        results: [],
        error: null,
        status: "idle",
        total_pages: 0,
        page: 0,
        productsResults: []
    } as MovieStore,
    reducers: {
        getActionMoviesStart: (state) => {
            state.status = "loading"
        },
        getActionMoviesSuccess: (state, action) => {
            state.status = "succeeded";
            state.results = state.results.concat(action.payload.results);
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
        },
        getActionMoviesFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    }
});

export default actionMoviesSlice;