import { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import Video from '../interfaces/Video'
import VideosProps from '../interfaces/VideosProps'
function VideoList({videos}: VideosProps) {

  const [currentVideo, setCurentVideo] = useState()
  
  const getVideo = async (e: React.MouseEvent<HTMLBaseElement>) => {
    e.preventDefault()
    console.log(e.currentTarget.textContent);
    
  }

  return (
    <ListGroup className='container-fluid p-5' defaultActiveKey="#link1">
          { videos && videos.map((m : Video) => (
            <ListGroup.Item onClick={(e : React.MouseEvent<HTMLBaseElement>) => getVideo(e)} key={m.id} action>
              {m.filename}
            </ListGroup.Item>
          )) }
          {/* VideoPlayer */}
    </ListGroup>
  )
}

export default VideoList