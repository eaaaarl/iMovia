import { useGetMoviesQuery } from "../api/tmbdbApi";

export const useMovies = () => {
  const { data, isError, isLoading } = useGetMoviesQuery("");

  return {
    data,
    isError,
    isLoading,
  };
};
