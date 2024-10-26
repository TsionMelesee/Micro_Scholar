import { useEffect, useState } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    // callback?.();
    const controller = new AbortController();
    const signal = controller.signal;
    async function MovieFetch() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=ee96fac4&s=${query}`,
          { signal }
        );
        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies!");
        }
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (!query.length) {
      setMovies([]);
      setError("");
      return;
    }
    MovieFetch();
    return function () {
      controller.abort();
    };
  }, [ query]);
  return { movies, isLoading, error };
}
