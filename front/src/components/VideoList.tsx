import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import IVideo from "../interfaces/IVideo";
import IVideosProps from "../interfaces/IVideosProps";
import VideoPlayer from "./VideoPlayer";

function VideoList({
  updateVideoList,
  videoList,
  newVideo,
  updateNewVideo,
  showList,
  updateShowList,
}: IVideosProps) {
  // SELECTED VIDEO
  const [currentVideo, setCurentVideo] = useState<string | null>(null);
  // const [allVideos, setAllVideos] = useState<Video[]>(videoList);

  useEffect(() => {
    fetchData();
  }, [newVideo]);

  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/files/all`);
    updateVideoList(res.data);
  };
  const getVideo = async (e: React.MouseEvent<HTMLBaseElement>) => {
    e.preventDefault();

    //TOGGLE THE VIDEO PLAYER
    const selection = e.currentTarget.textContent;
    if (!currentVideo) {
      setCurentVideo(selection);
    } else {
      setCurentVideo(null);
    }
  };

  return (
    <ListGroup className="container-fluid p-5 d-flex flex-column align-items-center justify-content-center">
      {videoList &&
        showList &&
        videoList.map((m: IVideo) => (
          <ListGroup.Item
            onClick={(e: React.MouseEvent<HTMLBaseElement>) => getVideo(e)}
            key={m.id}
            action
          >
            {m.filename}
          </ListGroup.Item>
        ))}

      {currentVideo && <VideoPlayer video={currentVideo!} />}
    </ListGroup>
  );
}

export default VideoList;
