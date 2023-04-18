import {createSlice} from "@reduxjs/toolkit";
import {MovieStore} from "../../models/MovieStore";

const documentaryMoviesSlice = createSlice({
    name: "DocumentaryMoviesSlice",
    initialState: {
        page: 0,
        productsResults: [],
        total_pages: 0,
        status: "idle",
        error: null,
        results: []
    } as MovieStore,
    reducers: {
        getDocumentaryMoviesStart: (state) => {
            state.status = "loading"
        },
        getDocumentaryMoviesSuccess: (state, action) => {
            state.status = "succeeded";
            state.results = state.results.concat(action.payload.results);
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
        },
        getDocumentaryMoviesFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    }
});

export default documentaryMoviesSlice;