import { Request, Response } from "express";
import pump from "pump";
import client from "../../utils/webtorrent";
import srt2vtt from "srt-to-vtt";

export async function subs(
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
      return file.name.endsWith(".srt");
    });

    if (!file) {
      res.statusCode = 404;
      return res.end("404 Not Found");
    }

    const head = {
      "Content-Length": file.length,
    };

    res.writeHead(200, head);
    return pump(file.createReadStream().pipe(srt2vtt()), res);
  }

  if (torrent.ready) {
    onReady();
  }

  torrent.once("ready", onReady);
  torrent.once("error", () => {
    res.end();
  });

  req.on("close", () => {
    res.end();
  });
}
