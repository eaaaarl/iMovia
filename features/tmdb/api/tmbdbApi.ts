import { TMDB_CONFIG } from "@/constants/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_CONFIG.BASE_URL,
  }),

  endpoints: (build) => ({
    getMovies: build.query({
      query: (query = "") => ({
        url: query
          ? `/search/movie?query=${encodeURIComponent(query)}`
          : `/discover/movie?sort_by=popularity.desc`,
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }),
      transformResponse: (response: { results: any[] }) => response.results,
    }),

    getMovieDetails: build.query<MovieDetails, { movieId: string }>({
      query: ({ movieId }) => ({
        url: `/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }),
    }),
  }),
});

export const {
  useLazyGetMoviesQuery,
  useGetMoviesQuery,
  useLazyGetMovieDetailsQuery,
  useGetMovieDetailsQuery,
} = tmdbApi;
