import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { themoviedb } from "../../utils/axios";

const getExternalIds = async (id: number, res: Response) => {
  try {
    const externalIds: AxiosResponse = await themoviedb.get(
      `movie/${id}/external_ids`,
      {
        params: {
          api_key: "6deacaf91b2c7bcff9745805e6bdde45",
        },
      }
    );
    return externalIds.data;
  } catch (error) {
    res.status(500).send(error);
  }
};

const movies = async (req: Request<{ page: number }>, res: Response) => {
  const { page } = req.query;
  try {
    const responsePopularMovies: AxiosResponse = await themoviedb.get(
      "movie/popular",
      {
        params: {
          api_key: "6deacaf91b2c7bcff9745805e6bdde45",
          language: "en-US",
          page: page || 1,
        },
      }
    );
    const responseTopRatedMovies: AxiosResponse = await themoviedb.get(
      "movie/top_rated",
      {
        params: {
          api_key: "6deacaf91b2c7bcff9745805e6bdde45",
          language: "en-US",
          page: page || 1,
        },
      }
    );

    const responseTrendingMovies: AxiosResponse = await themoviedb.get(
      "trending/movie/day",
      {
        params: {
          api_key: "6deacaf91b2c7bcff9745805e6bdde45",
        },
      }
    );

    const topRatedMovies = responseTopRatedMovies.data.results;
    const popularMovies = responsePopularMovies.data.results;
    const trendingMovies = responseTrendingMovies.data.results;
    if (
      popularMovies.length > 0 &&
      topRatedMovies.length > 0 &&
      trendingMovies.length > 0
    ) {
      const popular = await Promise.all(
        popularMovies.map(async (movie: any) => {
          const externalIds = await getExternalIds(movie.id, res);
          return {
            ...movie,
            external_ids: externalIds,
          };
        })
      );

      const topRated = await Promise.all(
        topRatedMovies.map(async (movie: any) => {
          const externalIds = await getExternalIds(movie.id, res);
          return {
            ...movie,
            external_ids: externalIds,
          };
        })
      );

      const trending = await Promise.all(
        trendingMovies.map(async (movie: any) => {
          const externalIds = await getExternalIds(movie.id, res);
          return {
            ...movie,
            external_ids: externalIds,
          };
        })
      );

      return res.send({
        popular: popular,
        topRated: topRated,
        trending: trending,
      });
    } else {
      return res.send({
        popular: [],
        topRated: [],
        trending: [],
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default movies;
