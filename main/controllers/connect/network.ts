import { Request, Response } from "express";
import dns from "dns";

const network = async (req: Request, res: Response) => {
  function checkInternet(cb: any) {
    dns.lookup("google.com", function (err) {
      if (err && err.code === "ENOTFOUND") {
        cb(false);
      } else {
        cb(true);
      }
    });
  }

  checkInternet(function (isConnected: boolean) {
    if (isConnected) {
      return res.status(200).send(true);
    } else {
      return res.status(503).send(false);
    }
  });
};

export default network;
