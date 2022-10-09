import Image from "next/image";
import React from "react";
import HomeSearch from "../HomeSearch/HomeSearch";
import PopularMovies from "../PopularMovies/PopularMovies";

const HomeHeader: React.FC<{
  popularMovies: Array<any>;
}> = ({ popularMovies }) => {
  return (
    <div
      className="flex w-full relative min-h-[700px] after:bg-gradient-to-b after:from-gray-900/75 after:to-gray-900 after:absolute after:w-full after:h-full items-end after:z-10"
      style={{
        backgroundImage: "url(./images/home-cover.jpg)",
      }}
    >
      <div className="container mx-auto flex flex-col z-20">
        <div className="grid grid-cols-2 gap-4">
          <HomeSearch />
          <PopularMovies popularMovies={popularMovies} />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
