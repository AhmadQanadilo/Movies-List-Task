import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, faviorateList, toggleFav }) => {
  const isFavHandler = (movie) => {
    const isMovieInFavorites = faviorateList.some(
      (favMovie) => favMovie.id === movie.id
    );

    return isMovieInFavorites;
  };

  if (movies.length <= 0) {
    return (
      <div className="bg-gray-100 w-f p-4 rounded-md text-center w-full h-auto  lg:justify-start text-xl font-medium flex flex-col justify-center items-center gap-4">
        <p className="text-gray-600">No content found</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFav={isFavHandler(movie)}
          toggleFav={toggleFav}
        />
      ))}
    </div>
  );
};

export default MovieList;
