import axios from 'axios'
import { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import Video from '../interfaces/Video'
import VideosProps from '../interfaces/VideosProps'
import VideoPlayer from './VideoPlayer'
// import VideoPlayer from './VideoPlayer'
function VideoList({videos}: VideosProps) {

  const [currentVideo, setCurentVideo] = useState<string | null>(null)
  
  const getVideo = async (e: React.MouseEvent<HTMLBaseElement>) => {
    e.preventDefault()
    const selection = e.currentTarget.textContent
    
      setCurentVideo(selection)
  }

  return (
    <ListGroup className='container-fluid p-5' defaultActiveKey="#link1">
          { videos && videos.map((m : Video) => (
            <ListGroup.Item onClick={(e : React.MouseEvent<HTMLBaseElement>) => getVideo(e)} key={m.id} action>
              {m.filename}
            </ListGroup.Item>
            
          )) }
          { currentVideo && 
              <VideoPlayer video={currentVideo} />
          }
    </ListGroup>
  )
}

export default VideoList