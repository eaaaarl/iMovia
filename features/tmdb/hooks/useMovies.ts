import { useGetMoviesQuery } from "../api/tmbdbApi";

export const useMovies = () => {
  const { data: MovieQuery, isError, isLoading } = useGetMoviesQuery("");

  return {
    data: MovieQuery,
    isError,
    isLoading,
  };
};
