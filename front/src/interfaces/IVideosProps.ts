import Video from "./IVideo";

interface VideosProps {
     videoList : Video[];
     updateVideoList : (videos : Video[]) => void;
     newVideo: Video;
     updateNewVideo: (video: Video) => void;
     showList: boolean;
     updateShowList: (b: boolean) => void;
}

export default VideosProps