import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import requests from "../utils/requests";

const documentaryApi = createApi({
  reducerPath: 'documentary',
  baseQuery: fetchBaseQuery({}),
  endpoints: build => ({
    getDocumentaryMovies: build.query({
      query: () => requests.fetchDocumentaries
    })
  })
});

export default documentaryApi;

export const { useGetDocumentaryMoviesQuery } = documentaryApi;