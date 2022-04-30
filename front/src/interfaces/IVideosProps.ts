import Video from "./IVideo";

interface VideosProps {
     videoList : Video[];
     updateVideoList : (videos : Video[]) => void;
}

export default VideosProps