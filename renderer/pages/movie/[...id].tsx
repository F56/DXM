import type { NextPage } from "next";
import { useRouter } from "next/router";
import MovieDetails from "../../components/common/MovieDetails/MovieDetails";

const Movie: NextPage = () => {
  const { query } = useRouter();
  return (
    <MovieDetails
      movie_id={query.id && query.id.length > 0 && query.id[0]}
      query_term={query.id && query.id.length > 0 && query.id[1]}
    />
  );
};

export default Movie;
