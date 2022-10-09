import React from "react";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import { HashLoader } from "react-spinners";

const VideoPlayer: React.FC<{ infoHash: string }> = ({ infoHash }) => {
  const [subs, setSubs] = React.useState<{
    loading: boolean;
    error: boolean;
    data: any;
    metadata: boolean;
  }>({
    loading: true,
    error: false,
    data: null,
    metadata: false,
  });

  React.useEffect(() => {
    const getMetadata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/metadata/${infoHash}`
        );

        if (response.status === 200) {
          setSubs({
            loading: true,
            error: false,
            data: null,
            metadata: true,
          });
        } else {
          setSubs({
            loading: false,
            error: true,
            data: null,
            metadata: false,
          });
        }
      } catch (error) {
        console.log(error);
        setSubs({
          loading: false,
          error: true,
          data: null,
          metadata: false,
        });
      }
    };
    getMetadata();
    console.log("Entering video player");
  }, []);

  React.useEffect(() => {
    const destroy = async () => {
      console.log("Destroying video player");
      try {
        axios.delete(`http://localhost:3000/destroy/${infoHash}`);
      } catch (e) {
        console.log(e);
      }
    };
    return () => {
      destroy();
    };
  }, []);

  React.useEffect(() => {
    const getSubs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/subs/${infoHash}`
        );
        const file = new Blob([response.data], {
          type: "text/html",
        });
        const url = URL.createObjectURL(file);
        setSubs({
          loading: false,
          error: false,
          data: url,
          metadata: true,
        });
      } catch (error) {
        console.log(error);
        setSubs({
          loading: false,
          error: false,
          data: null,
          metadata: false,
        });
      }
    };
    if (subs.metadata) {
      getSubs();
    }
    return () => {};
  }, [subs.metadata]);

  if (subs.loading)
    return (
      <div className="flex-1 flex flex-col overflow-auto items-center justify-center">
        <HashLoader color="#36d7b7" size={100} />
      </div>
    );
  if (subs.error) return null;

  return (
    <ReactPlayer
      stopOnUnmount={true}
      controls
      muted={true}
      width="100%"
      height="100%"
      style={{
        width: "100% !important",
        height: "100% !important",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "black",
      }}
      url={`http://localhost:3000/stream/${infoHash}`}
      config={{
        file: {
          attributes: {
            crossOrigin: "anonymous",
            disablePictureInPicture: true,
            controlsList: "nodownload noremoteplayback noplaybackrate",
            autoPlay: true,
          },
          tracks: [
            {
              kind: "subtitles",
              src: subs.data,
              srcLang: "en",
              default: true,
              label: "English",
            },
          ],
        },
      }}
    />
  );
};

export default VideoPlayer;
