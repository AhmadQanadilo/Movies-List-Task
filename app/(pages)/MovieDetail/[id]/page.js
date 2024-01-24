import { getMovieDetails } from "@/app/services/movieApi";
import Image from "next/image";
import React from "react";

const MovieDetail = async ({ params }) => {
  const { id } = params;
  const movie = await getMovieDetails(id);

  const {
    title,
    release_date,
    overview,
    backdrop_path,
    genres,
    vote_average,
    vote_count,
  } = movie;
  const genre_names = genres.map((genre) => {
    return genre.name;
  });
  const roundedVoteAverage = vote_average.toFixed(1);

  return (
    <div className="w-full  text-2xl flex flex-col items-center ">
      <div className="relative w-full">
        <div className="w-full aspect-video rounded overflow-hidden">
          <Image
            loading="lazy"
            blurDataURL={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            layout="fill"
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={title}
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 gap-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className=" font-medium text-sm text-gray-200">
            Average Rating: {roundedVoteAverage}
          </p>
        </div>
      </div>

      <div className="container mx-auto mt-6 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-700 text-sm pb-1">
              Release Date: <br />{" "}
              <span className="text-gray-900 font-medium ">{release_date}</span>
            </p>
            <p className="text-gray-700 text-sm pb-1">
              Genres: <br />{" "}
              <span className="text-gray-900 font-medium ">
                {genre_names.join(", ")}
              </span>{" "}
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-sm pb-1">
              Vote Count: <br />{" "}
              <span className="text-gray-900 font-medium ">{vote_count}</span>
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-gray-700 text-base">{overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
