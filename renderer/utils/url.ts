import axios, { CancelTokenSource } from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
});

export const getStream = () => {
    return "http://localhost:3000/stream/0b9b1b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b/0";
};

export const cancelStream = (cancelToken: CancelTokenSource) => {
    cancelToken.cancel();
};

