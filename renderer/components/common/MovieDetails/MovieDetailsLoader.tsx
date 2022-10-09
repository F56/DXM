import React from "react";
import { HashLoader } from "react-spinners";

const MovieDetailsLoader: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col overflow-auto items-center justify-center">
      <HashLoader color="#36d7b7" size={100} />
    </div>
  );
};

export default MovieDetailsLoader;
