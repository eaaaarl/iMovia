import { TMDB_CONFIG } from "@/constants/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_CONFIG.BASE_URL,
  }),

  /*  endpoints: (build) => ({
    getMovies: build.query({
      query: (query: string) =>
        query
          ? `/search/movie?query=${encodeURIComponent(query)}`
          : `/discover/movie?sort_by=popularity.desc`,
    }),
  }), */
  endpoints: (build) => ({
    getMovies: build.query({
      query: () => ({
        url: "/discover/movie?sort_by=popularity.desc",
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }),
      transformResponse: (response: { results: any[] }) => response.results,
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
