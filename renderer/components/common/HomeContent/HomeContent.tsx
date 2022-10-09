import React from "react";
import HomeGenres from "../HomeGenres/HomeGenres";
import MovieSlider from "../MovieSlider/MovieSlider";

const HomeContent: React.FC<{
  popularMovies: any;
  topRatedMovies: any;
}> = ({ popularMovies, topRatedMovies }) => {
  return (
    <>
      <div className="container mx-auto flex flex-col z-20">
        <div className="grid grid-cols-3 gap-10">
          <div className="flex flex-col col-span-3">
            <div className=" filter backdrop-blur-sm flex flex-col">
              <h4 className="text-gray-200 text-2xl tracking-tighter pb-10">
                Top Rated Movies
              </h4>
              <MovieSlider dark={true} movies={topRatedMovies} />
            </div>
          </div>
          {/* <div className="col-span-1">
            <HomeGenres />
          </div> */}
        </div>
      </div>
      <div className="container mx-auto flex flex-col z-20">
        <div className="grid grid-cols-3 gap-10">
          {/* <div className="col-span-1">
            <HomeGenres />
          </div> */}
          <div className="flex flex-col col-span-3">
            <div className=" filter backdrop-blur-sm flex flex-col">
              <h4 className="text-gray-200 text-2xl tracking-tighter pb-10">
                Trending Movies
              </h4>
              <MovieSlider dark={true} movies={popularMovies} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
