import { Request, Response } from "express";
import { yts, themoviedb } from "../../utils/axios";

const details = async (req: Request<{ query_term: string, page: string, movie_id: string }>, res: Response) => {
    const { query_term, page, movie_id } = req.query;
    try {
        const dataTorrent = await yts.get("list_movies.json", {
            params: {
                query_term: query_term,
                limit: 1,
                page: page || 1
            },
        });
        let torrents: any;
        if (dataTorrent.data.data.movie_count > 0) {
            torrents = dataTorrent.data.data.movies[0].torrents;
        } else {
            torrents = [];
        }

        const dataMovie = await themoviedb.get(`movie/${movie_id}`, {
            params: {
                api_key: "6deacaf91b2c7bcff9745805e6bdde45",
                language: "en-US",
            },
        });
        const movie = dataMovie.data;
        return res.status(200).send({ movie, torrents });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { details };