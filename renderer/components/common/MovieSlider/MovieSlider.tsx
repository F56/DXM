import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieSlider: React.FC<{ dark: boolean; movies: Array<any> }> = ({
  dark,
  movies,
}) => {
  const [scrollLeftEnd, setScrollLeftEnd] = React.useState(true);
  const [scrollRightEnd, setScrollRightEnd] = React.useState(false);

  return (
    <div
      className={`relative flex flex-row overflow-x-scroll gap-4 w-full ${
        dark ? "" : "px-10"
      }`}
      onScroll={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.scrollLeft === 0) {
          setScrollLeftEnd(true);
        } else {
          setScrollLeftEnd(false);
        }
        if (target.scrollLeft + target.clientWidth === target.scrollWidth) {
          setScrollRightEnd(true);
        } else {
          setScrollRightEnd(false);
        }
      }}
    >
      {!scrollLeftEnd && (
        <div
          className={`fixed w-8 h-[305px] left-0 z-10 ${
            dark
              ? "bg-gradient-to-l from-gray-900/0 to-gray-900"
              : "bg-gradient-to-l from-white/0 to-white"
          }`}
        />
      )}
      {!scrollRightEnd && (
        <div
          className={`fixed w-8 h-[305px] z-10 right-0 ${
            dark
              ? "bg-gradient-to-r from-gray-900/0 to-gray-900"
              : "bg-gradient-to-r from-white/0 to-white"
          }`}
        />
      )}
      {movies?.map((movie) => (
        <div className="flex flex-col w-[150px] pb-6 flex-grow" key={movie.id}>
          <Link href={`/movie/${movie.id}/${movie.external_ids.imdb_id}`}>
            <div className="relative w-full h-[225px] bg-teal-300 rounded-md cursor-pointer">
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                layout="fill"
                objectFit="fill"
                className="rounded-md"
              />
            </div>
          </Link>
          <div className="flex flex-col mt-3">
            <h4
              className={`${
                dark ? "text-gray-200" : "text-gray-900"
              } text-md tracking-tighter font-bold`}
            >
              {movie.title}
            </h4>
            <p className="w-[150px] text-sm text-gray-400 tracking-tighter">
              {movie.release_date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieSlider;
