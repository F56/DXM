import React from "react";
import MovieSlider from "../MovieSlider/MovieSlider";

const PopularMovies: React.FC<{
  popularMovies: Array<any>;
}> = ({ popularMovies }) => {
  return (
    <div className="bg-white filter backdrop-blur-sm flex flex-col">
      <h4 className="text-gray-900 text-2xl tracking-tighter p-10">
        Popular Movies
      </h4>
      <MovieSlider dark={false} movies={popularMovies} />
    </div>
  );
};

export default PopularMovies;
