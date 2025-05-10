import { getTrendingMovies } from "@/libs/firebase";
import { useEffect, useState } from "react";

export const useTrendingMovies = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getTrendingMovies();
      setData(result);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Something went wrong")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
