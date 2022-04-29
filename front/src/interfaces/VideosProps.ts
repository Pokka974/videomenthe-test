import Video from "./Video";

interface VideosProps {
     videoList : Video[];
     updateVideoList : (videos : Video[]) => void;
}

export default VideosProps