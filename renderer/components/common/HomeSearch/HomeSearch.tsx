import React from "react";
import { useRouter } from "next/router";

const HomeSearch: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = React.useState<string>("");

  const handleQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    query.length > 0 &&
      router.push(`/search?query_term=${query}`);
  };

  return (
    <div
      className="relative after:bg-gradient-to-b after:from-teal-500/70 after:to-indigo-400 after:absolute after:w-full after:h-full filter backdrop-blur-sm flex flex-col justify-end"
      style={{
        backgroundImage:
          "linear-gradient(black, black), url(./images/home-search.jpg)",
        backgroundSize: "cover",
        backgroundBlendMode: "saturation",
      }}
    >
      <h2 className="text-white text-4xl font-semibold tracking-tighter px-10 z-10">
        DXM
      </h2>
      <h4 className="text-white text-2xl tracking-tighter px-10 z-10">
        Millions of movies to watch. Explore now!
      </h4>
      <form
        className="flex flex-row mt-10 bg-white rounded-full z-10 mx-10 mb-10"
        onSubmit={handleQuery}
      >
        <input
          type="text"
          className="w-full text-gray-900 px-4 py-2 rounded-l-full"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-gray-800 text-white px-6 py-2 rounded-full"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default HomeSearch;
