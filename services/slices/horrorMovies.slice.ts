import {createSlice} from "@reduxjs/toolkit";
import {MovieStore} from "../../models/MovieStore";

const horrorMoviesSlice = createSlice({
    name: "HorrorMoviesSlice",
    initialState: {
        results: [],
        page: 0,
        total_pages: 0,
        error: null,
        status: "idle",
        productsResults: []
    } as MovieStore,
    reducers: {
        getHorrorMoviesStart: (state) => {
            state.status = "loading"
        },
        getHorrorMoviesSuccess: (state, action) => {
            state.status = "succeeded";
            state.results = state.results.concat(action.payload.results);
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
        },
        getHorrorMoviesFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    }
});

export default horrorMoviesSlice;