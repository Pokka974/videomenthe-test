import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Ratio } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

interface IVideoPlayer {
  video: string | null;
}
function VideoPlayer({ video }: IVideoPlayer) {
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>; // REF TO THE <VIDEO> TAG

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [curentTime, setCurrentTime] = useState<number>(0);
  const [pathToVideo] = useState<string>(
    `${process.env.REACT_APP_API_URL}/files/${video}`
  );

  useEffect(() => {
    // SET THE VIDEO DURATION
    videoRef.current.onloadedmetadata = () => {
      setDuration(videoRef.current.duration);
    };

    // UPDATE THE CURRENT TIME WHILE PLAYING THE VIDEO
    videoRef.current.addEventListener("timeupdate", () => {
      setCurrentTime(videoRef.current.currentTime);
    });
  }, []);

  // PLAY / PAUSE
  const playPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // UPDATE CURRENT TIME WHEN DRAG THE INPUT RANGE
  const dragInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value));
    videoRef.current.currentTime = parseInt(e.target.value);
  };

  return (
    <>
      <Ratio aspectRatio="16x9" className="w-50 my-3 ">
        {pathToVideo && (
          <video onClick={playPause} ref={videoRef} playsInline autoPlay>
            <source src={pathToVideo} type="video/mp4" />
          </video>
        )}
      </Ratio>
      <button
        className="btn btn-light btn-outline-dark d-flex justify-content-center align-items-center"
        onClick={playPause}
      >
        {!isPlaying ? <FaPlay /> : <FaPause />}
      </button>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 mt-2 w-50">
        <input
          onChange={(e) => dragInput(e)}
          className="form-range"
          id="seek"
          value={curentTime || 0}
          min="0"
          max={duration}
          type="range"
          step="0.001"
        />
        <div className="seek-tooltip" id="seek-tooltip">
          {curentTime.toFixed(2)} : {duration.toFixed(2)}
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;
