import React from "react";
import { AnimeTrending } from "../../../../redux/api/api";
import AnimeSlider from "../AnimeSlider/AnimeSlider";

interface AnimeTrendingProps {
  data: AnimeTrending;
}

const AnimeTrending: React.FC<AnimeTrendingProps> = ({ data }) => {
  const [tab, setTab] = React.useState(0);
  const classes: string =
    "transition-all ease-in-out flex flex-col items-center justify-center w-full relative after:bg-gradient-to-b after:from-orange-500/70 after:to-orange-500 after:absolute after:w-full after:h-full filter backdrop-blur-sm";
  const getCover = (): string => {
    switch (tab) {
      case 0:
        return data.trending[0].attributes.coverImage.large;
      case 1:
        return data.top[0].attributes.coverImage.large;
      case 2:
        return data.latest[0].attributes.coverImage.large;
    }
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(black, black), url(${getCover()})`,
        backgroundSize: "cover",
        backgroundBlendMode: "saturation",
      }}
      className={classes}
    >
      <div className="flex flex-row w-full z-10 px-10 items-center justify-between pt-10">
        <div className="flex flex-row gap-4">
          <button
            className={`border-b-2 ${
              tab === 0 ? "border-white" : "border-transparent"
            } px-4 py-2 text-white text-base tracking-tighter hover:border-white transition-all ease-in-out`}
            onClick={() => {
              setTab(0);
            }}
          >
            Trending Anime
          </button>
          <button
            className={`border-b-2 ${
              tab === 1 ? "border-white" : "border-transparent"
            } px-4 py-2 text-white text-base tracking-tighter hover:border-white transition-all ease-in-out`}
            onClick={() => {
              setTab(1);
            }}
          >
            Top Rated Anime
          </button>
          <button
            className={`border-b-2 ${
              tab === 2 ? "border-white" : "border-transparent"
            } px-4 py-2 text-white text-base tracking-tighter hover:border-white transition-all ease-in-out`}
            onClick={() => {
              setTab(2);
            }}
          >
            Popular Anime
          </button>
        </div>
        <button className="bg-black rounded-full px-4 py-2 text-gray-200 text-base tracking-tighter place-self-end justify-self-end">
          Anime Trending
        </button>
      </div>
      {tab === 0 && <AnimeSlider animes={data.trending} />}
      {tab === 1 && <AnimeSlider animes={data.top} />}
      {tab === 2 && <AnimeSlider animes={data.latest} />}
    </div>
  );
};

export default AnimeTrending;
