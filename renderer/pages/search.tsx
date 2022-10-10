import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { XMarkIcon, ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import MovieDetails from "../components/common/MovieDetails/MovieDetails";
import { PortalWithState } from "react-portal";
import Image from "next/image";
import { useSearchMoviesQuery } from "../redux/api/api";
import { HashLoader } from "react-spinners";
import Link from "next/link";

const Search: NextPage = () => {
  const router = useRouter();
  const { query } = useRouter();
  const { query_term } = query;
  const [value, setValue] = React.useState<string>(query_term as string);
  const { isError, isFetching, isLoading, data, originalArgs } =
    useSearchMoviesQuery(query_term as string);

  return (
    <div className="flex flex-col w-full gap-10">
      <div
        className="relative flex flex-col min-h-[300px] w-full justify-end after:bg-gradient-to-b after:from-gray-900/0 after:via-gray-900/90 after:to-gray-900 after:absolute after:w-full after:top-0 after:left-0 after:h-full filter backdrop-blur-sm"
        style={{
          backgroundImage: `url(/images/search-bg.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <button
          className="absolute z-10 top-0 left-0 mt-10 ml-10 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-all ease-in-out"
          onClick={() => router.back()}
        >
          <ArrowLongLeftIcon className="w-6 h-6 text-white" />
        </button>
        <div className="z-10 container mx-auto flex flex-col gap-5 p-10 bg-gradient-to-br from-sky-500/80 to-indigo-500">
          <h4 className="text-white text-2xl tracking-tighter">
            Start exploring movies!
          </h4>
          <form
            className="flex flex-row bg-white rounded-full"
            onSubmit={(e) => {
              e.preventDefault();
              value.length > 0 &&
                originalArgs !== value &&
                router.replace(`/search?query_term=${value}`);
            }}
          >
            <input
              type="text"
              className="w-full text-gray-900 px-4 py-2 rounded-l-full"
              placeholder="Search for a movie..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="bg-gray-800 text-white px-6 py-2 rounded-full"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {isFetching && (
        <div className="container mx-auto flex flex-row flex-wrap h-[350px] mt-4 gap-4 items-center justify-center">
          <HashLoader color="#36d7b7" size={100} />
        </div>
      )}
      {isError && (
        <div className="container mx-auto flex flex-row flex-wrap h-[350px] mt-4 gap-4 items-center justify-center">
          <h4 className="text-white text-2xl tracking-tighter">
            Ups! Something went wrong.
          </h4>
        </div>
      )}
      {data && !isFetching && (
        <div className="container mx-auto flex flex-row flex-wrap gap-4 items-start justify-center">
          {data.query.map((movie: any) => (
            <div className="flex flex-col w-[150px] pb-6" key={movie.id}>
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
                    true ? "text-gray-200" : "text-gray-900"
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
      )}
    </div>
  );
};

export default Search;
