import { LegacyRef, MutableRefObject, ReactEventHandler, useEffect, useRef, useState } from 'react'
import { Ratio } from 'react-bootstrap'
import {FaPlay} from 'react-icons/fa'
import {FaPause} from 'react-icons/fa'
function VideoPlayer({video} : any) {
     const videoRef = useRef() as MutableRefObject<HTMLVideoElement>
     const inputRef = useRef() as MutableRefObject<HTMLInputElement>
     const progressRef = useRef() as MutableRefObject<HTMLProgressElement>

     const [isPlaying, setIsPlaying] = useState<boolean>(true)
     const [duration, setDuration] = useState<number>(0)
     const [curentTime, setCurrentTime] = useState<number>(0)

     const pathToVideo : string = `http://localhost:8000/files/${video}`
     
     useEffect(() => {
          setDuration(videoRef.current.duration)
     }, [])
     const playPause = () => {

          if (videoRef.current.paused) {
               videoRef.current.play()
               
               setIsPlaying(true)
          } else {
               videoRef.current.pause()
               setIsPlaying(false)
          }
     }

     const updateProgressBar = () => {
          inputRef.current.value = videoRef.current.currentTime.toString()
          progressRef.current.value = videoRef.current.currentTime
          setCurrentTime(videoRef.current.currentTime)
     }

     return (
          <>
               <Ratio aspectRatio='16x9' className='w-50 my-3 '>
                    <video onTimeUpdate={() => updateProgressBar} onClick={playPause} ref={videoRef} playsInline autoPlay>
                         <source  src={pathToVideo} type="video/mp4" />
                    </video>
               </Ratio>
               <button className='btn success' onClick={playPause}>
                    {!isPlaying ? <FaPlay /> : <FaPause />}
               </button>
               <div>
                    {/* <progress ref={progressRef} id="progress-bar" value={curentTime}></progress> */}
                    <input ref={inputRef} className="seek" id="seek" value={curentTime} max={videoRef.current?.duration || 0} type="range" step="1"/>
                    <div className="seek-tooltip" id="seek-tooltip">{curentTime}</div>
               </div>
          </>
     )
   }

export default VideoPlayer