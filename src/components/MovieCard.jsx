import React from "react";
import { POSTER_BASE_URL } from "../api/constant";

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date, vote_average, original_language } =
    movie;

  return (
    <li className="movie-card" data-testid="card-item">
      <img
        src={
          poster_path ? `${POSTER_BASE_URL}/${poster_path}` : "/no-movie.png"
        }
        alt={title}
      />
      <h3>{title}</h3>
      <div className="content">
        <div className="rating">
          <img src="/star.svg" alt={`star from ${title}`} />
          <p data-testid="rating">
            {vote_average ? vote_average.toFixed(1) : "NN/A"}
          </p>
        </div>
        <span>•</span>
        <p className="lang">{original_language}</p>

        <span>•</span>
        <p className="year">
          {release_date ? release_date.split("-")[0] : "N/A"}
        </p>
      </div>
    </li>
  );
};

export default MovieCard;
