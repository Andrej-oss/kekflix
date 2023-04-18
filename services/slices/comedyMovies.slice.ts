import {createSlice} from "@reduxjs/toolkit";
import {MovieStore} from "../../models/MovieStore";

const comedyMoviesSlice = createSlice({
    name: "ComedyMoviesSlice",
    initialState: {
        page: 0,
        productsResults: [],
        total_pages: 0,
        status: "idle",
        error: null,
        results: []
    } as MovieStore,
    reducers: {
        getComedyMoviesStart: (state) => {
            state.status = "loading"
        },
        getComedyMoviesSuccess: (state, action) => {
            state.status = "succeeded";
            state.results = state.results.concat(action.payload.results);
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
        },
        getComedyMoviesFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    }
});

export default comedyMoviesSlice;