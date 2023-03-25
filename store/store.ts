import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
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

const store = configureStore({
  reducer: {
    [trendMoviesApi.reducerPath]: trendMoviesApi.reducer,
    [topRateApi.reducerPath]: topRateApi.reducer,
    [actionApi.reducerPath]: actionApi.reducer,
    [comedyApi.reducerPath]: comedyApi.reducer,
    [horrorApi.reducerPath]: horrorApi.reducer,
    [romanceApi.reducerPath]: romanceApi.reducer,
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
