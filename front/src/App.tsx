import UploadForm from "./components/UploadForm";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoList from "./components/VideoList";
import { useState } from "react";
import IVideo from "./interfaces/IVideo";
import Video from "./interfaces/IVideo";

function App() {
  const [allVideos, setAllVideos] = useState<IVideo[]>([]);
  // NEWVIDEO WILL RE-RENDER THE VIDEOLIST COMPONENT
  const [newVideo, setNewVideo] = useState<Video>({
    id: -1,
    filename: "",
  });
  const [showList, setShowList] = useState<boolean>(true);

  const updateVideosState = (newList: IVideo[]) => {
    setAllVideos(newList);
  };

  return (
    <main className="container-fluid d-flex flex-column align-items-center justify-content-center">
      <UploadForm
        videoList={allVideos}
        updateVideoList={updateVideosState}
        newVideo={newVideo}
        updateNewVideo={(video) => setNewVideo(video)}
        showList={showList}
        updateShowList={(b) => setShowList(b)}
      />
      <VideoList
        videoList={allVideos}
        updateVideoList={updateVideosState}
        newVideo={newVideo}
        updateNewVideo={(video) => setNewVideo(video)}
        showList={showList}
        updateShowList={(b) => setShowList(b)}
      />
    </main>
  );
}

export default App;
