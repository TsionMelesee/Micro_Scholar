import { useEffect, useState } from "react";
import StarRating from "./StarRating2";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);

  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function ErrorMsg({ err }) {
    return (
      <p className="error">
        <span>💀</span> {err}
      </p>
    );
  }
  useEffect(() => {
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
    handleMovieClosing();
    MovieFetch();
    return function () {
      controller.abort();
    };
  }, [query]);

  function handleMovieClick(id) {
    if (id === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  }

  function handleMovieClosing() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((movies) => movies.filter((e) => e.imdbID !== id));
  }

  return (
    <>
      <NavBar element={<NumResult movies={movies} />}>
        <SearchBar setQuery={setQuery} query={query} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              handleMovieClick={handleMovieClick}
              handleMovieClosing={handleMovieClosing}
            />
          )}
          {error && <ErrorMsg err={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovieDetails
              selectedId={selectedId}
              handleMovieClosing={handleMovieClosing}
              handleAddWatch={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function NavBar({ element, children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
      {element}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, handleMovieClick }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movies
          movie={movie}
          key={movie.imdbID}
          handleMovieClick={handleMovieClick}
        />
      ))}
    </ul>
  );
}
function Movies({ movie, handleMovieClick }) {
  return (
    <li key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummery({ watched, selectedId }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      {selectedId}
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchedMovieList({ watched, handleDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDeleteWatched={handleDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, handleDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
function SelectedMovieDetails({
  selectedId,
  handleMovieClosing,
  handleAddWatch,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isAlreadyWatched = watched.some(
    (watchedMovie) => watchedMovie.imdbID === selectedId
  );
  const watchedUserRating = watched.find(
    (e) => e.imdbID === selectedId
  )?.userRating;
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      Runtime: Number(movie.Runtime.split(" ")[0]),
      userRating,
    };
    handleAddWatch(newWatchedMovie);
    handleMovieClosing();
  }

  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = movie.Title;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [movie.Title]
  );
  useEffect(
    function () {
      async function SelectMovie() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=ee96fac4&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      SelectMovie();
    },
    [selectedId]
  );

  useEffect(
    function () {
      function handleKeyDown(e) {
        if (e.key === "Escape") {
          handleMovieClosing();
        }
      }

      document.addEventListener("keydown", handleKeyDown);
      return function () {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [handleMovieClosing]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleMovieClosing}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isAlreadyWatched ? (
                `You rated this movie ${watchedUserRating} ⭐`
              ) : (
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
              )}
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  Add to list
                </button>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
