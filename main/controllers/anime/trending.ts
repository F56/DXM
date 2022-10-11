import { Request, Response } from "express";
import { kitsu } from "../../utils/axios";

const trending = async (req: Request, res: Response) => {
  try {
    const { data: trending } = await kitsu.get("trending/anime", {
      params: { limit: 20 },
    });
    const { data: top } = await kitsu.get("anime", {
      params: { sort: "popularityRank", limit: 20 },
    });
    const { data: latest } = await kitsu.get("anime", {
      params: { sort: "-createdAt", limit: 20 },
    });
    res
      .status(200)
      .send({ trending: trending.data, top: top.data, latest: latest.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Kitsu API Error",
      status: 500,
    });
  }
};

export default trending;
