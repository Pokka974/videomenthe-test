import React from 'react'
import { Ratio } from 'react-bootstrap'

function VideoPlayer({video} : any) {
     const pathToVideo : string = `http://localhost:8000/${video}`
     return (
       
             <Ratio aspectRatio='16x9'>
                  <video id="videoPlayer" width="50%" controls autoPlay>
                       <source src={pathToVideo} type="video/mp4" />
                  </video>
   
             </Ratio>
       
     )
   }

export default VideoPlayer