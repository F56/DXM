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

const search = async (
  req: Request<{ page: number; query: string }>,
  res: Response
) => {
  const { page, query } = req.query;
  try {
    const responseSearch: AxiosResponse = await themoviedb.get("search/movie", {
      params: {
        api_key: "6deacaf91b2c7bcff9745805e6bdde45",
        language: "en-US",
        page: page || 1,
        query: query,
      },
    });

    const searchMovies = responseSearch.data.results;

    if (searchMovies.length > 0) {
      const query = await Promise.all(
        searchMovies.map(async (movie: any) => {
          const externalIds = await getExternalIds(movie.id, res);
          return {
            ...movie,
            external_ids: externalIds,
          };
        })
      );

      return res.send({
        query: query,
      });
    } else {
      return res.send({
        query: [],
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default search;
