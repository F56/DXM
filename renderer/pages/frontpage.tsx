import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useGetNetworkStatusQuery } from "../redux/api/api";
import { Loader } from "react-feather";
import { HashLoader } from "react-spinners";

const Frontpage: NextPage = () => {
  const { isLoading, isError, isSuccess } = useGetNetworkStatusQuery();
  const router = useRouter();
  if (isLoading)
    return (
      <div className="flex flex-col gap-5 items-center justify-center flex-1">
        <HashLoader color="#36d7b7" size={100} />
      </div>
    );
  if (isError)
    return (
      <div className="flex flex-col gap-5 items-center justify-center flex-1">
        <h1 className="text-7xl font-bold text-sky-300 tracking-tighter">
          DXM
        </h1>
        <h4 className="text-2xl tracking-tighter">
          ERROR: Please check your network status.
        </h4>
      </div>
    );

  const Redirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    React.useEffect(() => {
      router.push("/home");
    }, []);
    return <>{children}</>;
  };
  return (
    <Redirect>
      <div className="flex flex-col gap-5 items-center justify-center flex-1">
        <HashLoader color="#36d7b7" size={100} />
      </div>
    </Redirect>
  );
};

export default Frontpage;
