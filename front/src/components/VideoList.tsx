import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import Video from '../interfaces/Video'
import VideosProps from '../interfaces/VideosProps'
import VideoPlayer from './VideoPlayer'


function VideoList({updateVideoList, videoList} : VideosProps) {

  const [currentVideo, setCurentVideo] = useState<string | null>(null)

  useEffect(()  => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8000/files/all')
      updateVideoList(res.data)
    }
    fetchData()
  }, [])

  const getVideo = async (e: React.MouseEvent<HTMLBaseElement>) => {
    e.preventDefault()
    const selection = e.currentTarget.textContent
    if (!currentVideo) {
      setCurentVideo(selection)
    } else {
      setCurentVideo(null)
    }
  }

  return (
    <ListGroup className='container-fluid p-5 d-flex flex-column align-items-center justify-content-center' defaultActiveKey="#link1">
          { videoList && videoList.map((m : Video) => (
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