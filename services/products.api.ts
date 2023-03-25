import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import requests from "../utils/requests";
import {Product} from "../models/product";

const productsApi = createApi({
    reducerPath: 'product',
    baseQuery: fetchBaseQuery({}),
    endpoints: build => ({
       getProducts: build.query<Product[], null>({
           query: () => requests.fetchProducts
       })
    })
});

export default productsApi;

export const { useGetProductsQuery } = productsApi;