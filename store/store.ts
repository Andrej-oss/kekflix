import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
  actionApi,
  comedyApi,
  documentaryApi,
  horrorApi,
  romanceApi,
  topRateApi,
  trendMoviesApi
} from "../services/index";

const store = configureStore({
  reducer: {
    [trendMoviesApi.reducerPath]: trendMoviesApi.reducer,
    [topRateApi.reducerPath]: topRateApi.reducer,
    [actionApi.reducerPath]: actionApi.reducer,
    [comedyApi.reducerPath]: comedyApi.reducer,
    [horrorApi.reducerPath]: horrorApi.reducer,
    [romanceApi.reducerPath]: romanceApi.reducer,
    [documentaryApi.reducerPath]: documentaryApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(trendMoviesApi.middleware)
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
