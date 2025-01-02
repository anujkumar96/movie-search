import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, activeView }) => {
    // activeView is used to change views between poster and backdrop
    console.log("movie",);
    const { title, poster_path, overview, backdrop_path } = movie;
  return (
    <div className="movie-card">
      {activeView === "poster" ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="movie-poster"
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          alt={title}
          className="background-poster"
        />
      )}
      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-overview">{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
