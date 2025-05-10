import { getTrendingMovies, updateSearchCount } from "@/libs/firebase";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Trending"],
  endpoints: (builder) => ({
    getTrending: builder.query({
      queryFn: async () => {
        try {
          const data = await getTrendingMovies();
          return { data };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ["Trending"],
    }),
    updateSearch: builder.mutation({
      queryFn: async ({ query, movie }) => {
        try {
          await updateSearchCount(query, movie);
          return { data: "ok" };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ["Trending"],
    }),
  }),
});

export const { useGetTrendingQuery, useUpdateSearchMutation } = movieApi;
