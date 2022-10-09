import express from "express";
import { Server } from "http";
import cors from "cors";
import { stream } from "./controllers/stream";
import { details } from "./controllers/movies/details";
import movies from "./controllers/movies/movies";
import { subs } from "./controllers/movies/subs";
import os from "os";
import { metadata } from "./controllers/movies/metadata";
import { destroy } from "./controllers/movies/destroy";
import search from "./controllers/movies/search";
import network from "./controllers/connect/network";
import client from "./utils/webtorrent";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

let server: Server;

export const startServer = (cb: any) => {
  const port = process.env.PORT || 3000;
  app.get("/stream/:infoHash", stream);
  app.delete("/destroy/:infoHash", destroy);
  app.get("/subs/:infoHash", subs);
  app.get("/metadata/:infoHash", metadata);
  app.get("/movies/details", details);
  app.get("/movies/all", movies);
  app.get("/movies/search", search);
  app.get("/connect/network", network);
  console.log(os.tmpdir());
  server = app.listen(port, cb);
};

export const stopServer = () => {
  const torrents = client.torrents;
  const final = Promise.all(
    torrents.map((torrent) => {
      torrent.destroy(
        {
          destroyStore: true,
        },
        (error) => {
          if (error) {
            console.log(error);
            return Promise.reject(error);
          }
          return Promise.resolve();
        }
      );
    })
  );
  final
    .then(() => {
      console.log("Torrents stopped.");
      client.destroy();
      if (server) {
        console.log("Closing server.");
        server.close();
      }
    })
    .catch((error) => {
      console.log("Closing server with errors: ", error);
      server.close();
    });
};
