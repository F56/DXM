import axios from "axios";

const yts = axios.create({
  baseURL: "https://yts.mx/api/v2/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const themoviedb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const kitsu = axios.create({
  baseURL: "https://kitsu.io/api/edge/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { yts, themoviedb, kitsu };
