import { useUpdateSearchMutation } from "@/features/movie/api/movieApi";
import { useEffect, useState } from "react";
import { useLazyGetMoviesQuery } from "../api/tmbdbApi";

export const useSearchMovie = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, { data: movies = [], isLoading, isError }] =
    useLazyGetMoviesQuery();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const [updateSearchCount] = useUpdateSearchMutation();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        trigger(searchQuery);

        if (movies?.length > 0 && movies?.[0]) {
          await updateSearchCount({
            query: searchQuery,
            movie: movies[0],
          }).unwrap();
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, trigger, movies, updateSearchCount]);

  return {
    searchQuery,
    handleSearch,
    movies,
    isLoading,
    isError,
  };
};
