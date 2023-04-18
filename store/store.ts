import { configureStore } from "@reduxjs/toolkit";
import {
  actionApi,
  comedyApi,
  documentaryApi,
  horrorApi,
  productsApi,
  romanceApi,
  topRateApi,
  trendMoviesApi
} from "../services/index";
import {trendedMoviesReducer} from "../services/api/trendMovies.api";
import {topRateMoviesReducer} from "../services/api/topRateMovies.api";
import {actionMoviesReducer} from "../services/api/actionMovies.api";
import {comedyMoviesReducer} from "../services/api/comedyMovies.api";
import {horrorMoviesReducer} from "../services/api/horrorMovies.api";
import {romanceMoviesReducer} from "../services/api/romanceMovies.api";
import {documentaryMoviesReducer} from "../services/api/documentaryMovies.api";

// @ts-ignore
const store = configureStore({
  reducer: {
    trendedMovies: trendedMoviesReducer,
    [trendMoviesApi.reducerPath]: trendMoviesApi.reducer,
    topRateMovies: topRateMoviesReducer,
    [topRateApi.reducerPath]: topRateApi.reducer,
    actionMovies: actionMoviesReducer,
    [actionApi.reducerPath]: actionApi.reducer,
    comedyMovies: comedyMoviesReducer,
    [comedyApi.reducerPath]: comedyApi.reducer,
    horrorMovies: horrorMoviesReducer,
    [horrorApi.reducerPath]: horrorApi.reducer,
    romanceMovies: romanceMoviesReducer,
    [romanceApi.reducerPath]: romanceApi.reducer,
    documentaryMovies: documentaryMoviesReducer,
    [documentaryApi.reducerPath]: documentaryApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
        .concat(trendMoviesApi.middleware)
        .concat(topRateApi.middleware)
        .concat(actionApi.middleware)
        .concat(comedyApi.middleware)
        .concat(horrorApi.middleware)
        .concat(romanceApi.middleware)
        .concat(documentaryApi.middleware)
        .concat(productsApi.middleware)
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
