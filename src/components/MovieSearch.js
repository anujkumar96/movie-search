import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieSearch.css";
import { API_URL, DEFAULT_API_URL, TOKEN } from "./Constant";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeView, setActiveView] = useState("poster");

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (query) {
      setPage(1);
      fetchMovies();
    }
  }, [query]); //invoking fetchMovies function on query changes and reseting page to 1

  const fetchMovies = async () => {
    setLoading(true);
    const url = query
    ? `${API_URL}?query=${query}&page=${page}`
    : `${DEFAULT_API_URL}?page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: TOKEN,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(Math.ceil(data.total_results / 20) || 1);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="movie-search">
      <h1>Movie Search</h1>
      <div className="sub-container">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleSearch}
        className="search-bar"
        />

        {/* Uncomment to change views (including CSS) between Poster and Backdrop */}
      {/* <div className="view-container">
        <button
          onClick={(e) => setActiveView("poster")}
          >
          Poster View
        </button>
        <button
          onClick={(e) => setActiveView("backdrop")}
          >
          Backdrop View
        </button>
      </div> */}

    </div>
      {loading ? (
        <div className="spinner"></div>
      ) : movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} activeView={activeView} />
          ))}
        </div>
      ) : (
        <div className="no-data"></div>
      )}
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages || movies.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieSearch;
