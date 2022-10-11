import Image from "next/image";
import Link from "next/link";
import React from "react";

const AnimeSlider: React.FC<{ animes: Array<any> }> = ({ animes }) => {
  const [scrollLeftEnd, setScrollLeftEnd] = React.useState(true);
  const [scrollRightEnd, setScrollRightEnd] = React.useState(false);

  return (
    <div
      className="relative flex flex-row overflow-x-scroll gap-4 w-full px-10 z-10 mt-10"
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
        <div className="fixed w-8 top-0 bottom-0 left-0 z-10 bg-gradient-to-l from-orange-500/0 to-orange-500" />
      )}
      {!scrollRightEnd && (
        <div className="fixed w-8 top-0 bottom-0 right-0 z-10 bg-gradient-to-r from-orange-500/0 to-orange-500" />
      )}
      {animes?.map((anime) => (
        <div className="flex flex-col w-[150px] pb-6 flex-grow" key={anime.id}>
          <Link href={`/movie/${anime.id}`}>
            <div className="relative w-full h-[225px] bg-teal-300 rounded-md cursor-pointer">
              <Image
                src={anime.attributes.posterImage.medium}
                layout="fill"
                objectFit="fill"
                className="rounded-md"
              />
            </div>
          </Link>
          <div className="flex flex-col mt-3">
            <h4 className="text-gray-900text-md tracking-tighter font-bold w-[150px]">
              {anime.attributes.titles.en_jp}
            </h4>
            <p className="w-[150px] text-sm text-black tracking-tighter text-ellipsis whitespace-nowrap overflow-hidden">
              {anime.attributes.createdAt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimeSlider;
