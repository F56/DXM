import React from "react";
import HomeHeader from "../components/common/HomeHeader/HomeHeader";
import HomeContent from "../components/common/HomeContent/HomeContent";
import {
  useGetAnimeTrendingQuery,
  useGetMoviesPortalByPageQuery,
} from "../redux/api/api";
import { XCircle } from "react-feather";
import Footer from "../components/app/Footer/Footer";
import { PortalWithState } from "react-portal";
import { ipcRenderer } from "electron";
import { HashLoader } from "react-spinners";

function Home() {
  const ref = React.useRef<any>(null);
  const { data, isLoading, isError, isSuccess } =
    useGetMoviesPortalByPageQuery("1");
  const {
    data: animeData,
    isLoading: animeIsLoading,
    isError: animeIsError,
    isSuccess: animeIsSuccess,
  } = useGetAnimeTrendingQuery();
  React.useEffect(() => {
    if (isSuccess || animeIsSuccess) {
      ipcRenderer.invoke("get-store", "disclaimer").then((value) => {
        if (!value) {
          ref.current.openPortal();
        }
      });
    }
  }, [isSuccess, animeIsSuccess]);

  if (isLoading || animeIsLoading)
    return (
      <div className="flex flex-col gap-5 items-center justify-center flex-1">
        <HashLoader color="#36d7b7" size={100} />
      </div>
    );
  if (isError || animeIsError)
    return (
      <div className="flex flex-col gap-5 items-center justify-center flex-1">
        <div className="flex flex-row gap-4 items-center justify-center">
          <XCircle className="h-8 w-8 text-red-500" />
          <h4 className="text-2xl tracking-tighter">
            Ups! Something went wrong.
          </h4>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-x-10 gap-y-20 mb-20">
      <PortalWithState ref={ref}>
        {({ closePortal, portal }) => (
          <>
            {portal(
              <>
                <div className="absolute top-12 right-0 bottom-0 w-full bg-black/50 filter z-30 backdrop-blur-md" />
                <div className="absolute w-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-gray-900 rounded-md max-h-[600px] flex flex-col">
                  <div className="flex flex-col p-5 gap-4 overflow-auto">
                    <h4 className="text-xl tracking-tighter font-semibold">
                      Disclaimer
                    </h4>
                    <div className="flex flex-col gap-3">
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ut, alias numquam! Commodi ipsa nam debitis
                        magnam, rerum a sint placeat, totam repudiandae
                        laudantium, inventore soluta assumenda voluptatum
                        officia rem officiis.
                      </p>
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-end">
                      <button
                        className="bg-green-400 text-black rounded-md px-4 py-2"
                        onClick={() => {
                          ipcRenderer
                            .invoke("set-store", "disclaimer", true)
                            .then(() => {
                              closePortal();
                            });
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-400 text-black rounded-md px-4 py-2"
                        onClick={() => {
                          window.close();
                        }}
                      >
                        Exit
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </PortalWithState>
      <HomeHeader popularMovies={data.popular} />
      <HomeContent
        popularMovies={data.trending}
        topRatedMovies={data.topRated}
        animeTrending={animeData}
      />
      <Footer />
    </div>
  );
}

export default Home;
