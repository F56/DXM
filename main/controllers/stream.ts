import { Request, Response } from "express";
import pump from "pump";
import client from "../utils/webtorrent";

export async function stream(
  req: Request<{
    infoHash: string;
  }>,
  res: Response
) {
  const { infoHash } = req.params;
  const torrent = client.get(infoHash.toLowerCase());

  if (!torrent) {
    res.statusCode = 404;
    return res.end("404 Not Found");
  }

  async function onReady() {
    if (!torrent) return;

    const file = torrent.files.find((file) => {
      return file.name.endsWith(".mp4");
    });

    const fileSize = file.length;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      return pump(file.createReadStream({ start, end }), res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      return pump(file.createReadStream(), res);
    }
  }

  if (torrent.ready) {
    onReady();
  }

  torrent.once("ready", onReady);
  torrent.once("error", () => {
    res.end();
  });

  req.on("close", () => {
    console.log("Closing.")
    res.end();
  });
}
