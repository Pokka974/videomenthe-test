import React from 'react'
import { ListGroup } from 'react-bootstrap'

function VideoList() {
  return (
     <ListGroup className='container-fluid p-5' defaultActiveKey="#link1">
          <ListGroup.Item action>
          Link 1
          </ListGroup.Item>
          <ListGroup.Item action>
          Link 2
          </ListGroup.Item>
          <ListGroup.Item action >
          This one is a button
          </ListGroup.Item>
   </ListGroup>
  )
}

export default VideoList