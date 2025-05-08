import { useEffect, useState } from "react";
import { useLazyGetMoviesQuery } from "../api/tmbdbApi";

export const useSearchMovie = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, { data: movies = [], isLoading, isError }] =
    useLazyGetMoviesQuery();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        trigger(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, trigger]);

  return {
    searchQuery,
    handleSearch,
    movies,
    isLoading,
    isError,
  };
};
