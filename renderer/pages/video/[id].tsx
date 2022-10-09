import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import VideoPlayer from "../../components/common/VideoPlayer/VideoPlayer";

const Video: NextPage = () => {
  const { query, back } = useRouter();
  return (
    <div className="flex flex-1 flex-col relative w-full h-full">
      <button
        className="absolute z-10 top-0 left-0 mt-10 ml-10 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-all ease-in-out"
        onClick={() => back()}
      >
        <ArrowLongLeftIcon className="w-6 h-6 text-white" />
      </button>
      <VideoPlayer infoHash={query.id as string} />
    </div>
  );
};

export default Video;
