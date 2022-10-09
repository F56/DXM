import Image from "next/image";
import React from "react";
import { useGetMovieDetailsQuery } from "../../../redux/api/api";
import MovieDetailsLoader from "./MovieDetailsLoader";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import RatingCounter from "../RatingCounter/RatingCounter";
import { Share2, Bookmark, Heart } from "react-feather";
import { ArrowLongLeftIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const MovieDetails: React.FC<{ movie_id: string; query_term: string }> = ({
  movie_id,
  query_term,
}) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetMovieDetailsQuery({
    query_term: query_term,
    movie_id: movie_id,
  });

  if (isLoading) return <MovieDetailsLoader />;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex-1 flex flex-col relative">
      <button
        className="absolute z-10 top-0 left-0 mt-10 ml-10 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-all ease-in-out"
        onClick={() => router.back()}
      >
        <ArrowLongLeftIcon className="w-6 h-6 text-white" />
      </button>
      <div className="py-10 container mx-auto relative w-full">
        <div
          className="absolute top-0 left-0 right-0 z-20 w-full h-[600px] rounded-md after:bg-gradient-to-r after:from-gray-900 after:via-gray-900/90 after:to-gray-900 after:left-0 after:top-0 after:right-0 after:bottom-0 after:absolute"
          style={{
            backgroundImage: `linear-gradient(black, black), url(https://image.tmdb.org/t/p/original${data.movie.backdrop_path})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "saturation",
          }}
        />
        <div className="flex flex-row gap-8 px-10 py-4">
          <div className="relative w-[300px] h-[450px] z-30">
            <Image
              src={`https://image.tmdb.org/t/p/w500${data.movie.poster_path}`}
              layout="fill"
              objectFit="fill"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col flex-1 gap-8 z-30 py-10">
            <h1 className="max-w-lg text-3xl tracking-tighter font-bold">
              {data.movie.title}
            </h1>
            <div className="flex flex-row gap-2 items-center">
              <RatingCounter rating={data.movie.vote_average} />
              <Tooltip
                placement="bottom"
                trigger={["hover"]}
                overlayInnerStyle={{
                  backgroundColor: "rgb(17 24 39 / 0.9)",
                }}
                overlay={
                  <div className="text-base text-gray-200 tracking-tighter px-2">
                    Watchlist
                  </div>
                }
                zIndex={100}
                align={{
                  offset: [0, -5],
                }}
              >
                <button className="rounded-full bg-gray-900/90 p-2 hover:bg-gray-700/90 transition-all ease-in-out">
                  <Bookmark className="w-4 h-4 text-teal-200" />
                </button>
              </Tooltip>
              <Tooltip
                placement="bottom"
                trigger={["hover"]}
                overlay={
                  <div className="text-base text-gray-200 tracking-tighter px-2">
                    Share
                  </div>
                }
                zIndex={100}
                align={{
                  offset: [0, -5],
                }}
                overlayInnerStyle={{
                  backgroundColor: "rgb(17 24 39 / 0.9)",
                }}
              >
                <button className="rounded-full bg-gray-900/90 p-2 hover:bg-gray-700/90 transition-all ease-in-out">
                  <Share2 className="w-4 h-4 text-blue-400" />
                </button>
              </Tooltip>
              <Tooltip
                placement="bottom"
                trigger={["hover"]}
                overlay={
                  <div className="text-base text-gray-200 tracking-tighter px-2">
                    Love it
                  </div>
                }
                zIndex={100}
                align={{
                  offset: [0, -5],
                }}
                overlayInnerStyle={{
                  backgroundColor: "rgb(17 24 39 / 0.9)",
                }}
              >
                <button className="rounded-full bg-gray-900/90 p-2 hover:bg-gray-700/90 transition-all ease-in-out">
                  <Heart className="w-4 h-4 text-red-400" />
                </button>
              </Tooltip>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-base tracking-tighter">Overview</h4>
              <p className="text-sm text-gray-300 tracking-tighter">
                {data.movie.overview}
              </p>
            </div>
            <div className="flex flex-row gap-4">
              {data.torrents.length > 0 && (
                <Menu
                  arrow={true}
                  menuButton={
                    <MenuButton className="bg-teal-400 rounded-full p-3 flex flex-col items-center justify-center">
                      <PlayIcon className="w-6 h-6 text-gray-900" />
                    </MenuButton>
                  }
                  transition
                >
                  {data.torrents.map((torrent) => (
                    <MenuItem
                      key={torrent.hash}
                      className="uppercase text-sm tracking-tighter"
                      onClick={() => {
                        router.push(`/video/${torrent.hash}`);
                      }}
                    >
                      {torrent.type} {torrent.quality}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
