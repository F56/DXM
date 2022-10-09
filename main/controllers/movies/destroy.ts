import { Request, Response } from "express";
import client from "../../utils/webtorrent";

export async function destroy(
  req: Request<{
    infoHash: string;
  }>,
  res: Response
) {
  const { infoHash } = req.params;

  console.log("Torrent already added to client.");
  const tor = client.torrents.find(
    (torrent) => torrent.infoHash === infoHash.toLowerCase()
  );
  if (tor) {
    tor.destroy();
    return res.status(200).send({ message: "Torrent removed successfully" });
  }
  return res.status(200).send({ message: "Torrent doesn't exist." });
}
