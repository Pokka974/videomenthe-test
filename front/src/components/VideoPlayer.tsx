import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Ratio } from 'react-bootstrap'
import {FaPlay} from 'react-icons/fa'
import {FaPause} from 'react-icons/fa'
function VideoPlayer({video} : any) {
     const videoRef = useRef() as MutableRefObject<HTMLVideoElement>

     const [isPlaying, setIsPlaying] = useState<boolean>(true)
     const [duration, setDuration] = useState<number>(0)
     const [curentTime, setCurrentTime] = useState<number>(0)

     const pathToVideo : string = `http://localhost:8000/files/${video}`
     
     useEffect(() => {
          
          videoRef.current.onloadedmetadata = () => {
               setDuration(videoRef.current.duration)
          }
          videoRef.current.addEventListener('timeupdate', () => {
               setCurrentTime(videoRef.current.currentTime)
          })
          
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

     const dragInput = (e : React.ChangeEvent<HTMLInputElement>) => {
          setCurrentTime(parseInt(e.target.value))
          videoRef.current.currentTime = parseInt(e.target.value)
     }

     return (
          <>
               <Ratio aspectRatio='16x9' className='w-50 my-3 '>
                    <video onClick={playPause} ref={videoRef} playsInline autoPlay>
                         <source  src={pathToVideo} type="video/mp4" />
                    </video>
               </Ratio>
               <button className='btn btn-light btn-outline-dark d-flex justify-content-center align-items-center' onClick={playPause}>
                    {!isPlaying ? <FaPlay /> : <FaPause />}
               </button>
               <div className='d-flex flex-column justify-content-center align-items-center gap-2 mt-2 w-50'>
                    <input onChange={(e) => dragInput(e)} className="form-range" id="seek" value={curentTime || 0} min='0' max={duration} type="range" step='0.001' />
                    <div className="seek-tooltip" id="seek-tooltip">{curentTime.toFixed(2)} : {duration.toFixed(2)}</div>
               </div>
          </>
     )
   }

export default VideoPlayer