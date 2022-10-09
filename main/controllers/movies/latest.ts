import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { yts } from "../../utils/axios";

const getLatest = async (req: Request<{ page: number }>, res: Response) => {
    const { page } = req.query;
    const latest: AxiosResponse = await yts.get("list_movies.json", {
        params: {
            page: page || 1,
            limit: 50,
            quality: "1080p",
            minimum_rating: 8,
        },
    });
    return res.send(latest.data.data.movies);
}

export { getLatest as latest };