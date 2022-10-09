import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface MoviesPortal {
  popular: any[];
  topRated: any[];
  trending: any[];
}

interface MovieDetails {
  movie: any;
  torrents: any[];
}

interface SearchMovies {
  query: any[];
}

export type MovieDetailsResponse = MovieDetails;
export type MoviesPortalResponse = MoviesPortal;
export type SearchMoviesResponse = SearchMovies;

export const dxmApi = createApi({
  reducerPath: "DXM_API",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getMoviesPortalByPage: builder.query<MoviesPortalResponse, string>({
      query: (page: string) => `movies/all?page=${page}`,
    }),
    getMovieDetails: builder.query<
      MovieDetailsResponse,
      {
        movie_id: string;
        query_term: string;
      }
    >({
      query: (args) =>
        `movies/details?query_term=${args.query_term}&movie_id=${args.movie_id}&page=1`,
    }),
    getNetworkStatus: builder.query<void, void>({
      query: () => `connect/network`,
    }),
    searchMovies: builder.query<SearchMoviesResponse, string>({
      query: (query) => `movies/search?query=${query}&page=1`,
    }),
  }),
});

export const {
  useGetMoviesPortalByPageQuery,
  useGetMovieDetailsQuery,
  useGetNetworkStatusQuery,
  useSearchMoviesQuery,
} = dxmApi;
export const { endpoints, reducerPath, reducer, middleware } = dxmApi;
