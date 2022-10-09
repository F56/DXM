import { Request, Response } from "express";
import client from "../../utils/webtorrent";

const checkIfTorrentExists = (infoHash: string) => {
  const tor = client.torrents.find(
    (torrent) => torrent.infoHash === infoHash.toLowerCase()
  );
  if (tor) {
    return true;
  }
  return false;
};

export async function metadata(
  req: Request<{
    infoHash: string;
  }>,
  res: Response
) {
  const { infoHash } = req.params;

  if (checkIfTorrentExists(infoHash)) {
    console.log("Torrent already added to client.");
    const tor = client.torrents.find(
      (torrent) => torrent.infoHash === infoHash.toLowerCase()
    );
    return res.status(200).send({
      infoHash: tor.infoHash,
      torrentName: tor.name,
      torrentPath: tor.path,
    });
  } else {
    const torrent = client.add(infoHash);
    if (torrent) {
      console.log("Adding torrent to client.");
      res.status(200).send({
        infoHash: torrent.infoHash,
        torrentName: torrent.name,
        torrentPath: torrent.path,
      });
    }
  }
}
