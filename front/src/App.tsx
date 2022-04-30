import UploadForm from './components/UploadForm';
import 'bootstrap/dist/css/bootstrap.min.css'
import VideoList from './components/VideoList';
import { useState } from 'react';
import IVideo from './interfaces/IVideo';

function App() {

  const [allVideos, setAllVideos] = useState<IVideo[]>([])

  const updateVideosState = (newList : IVideo[]) => {
     setAllVideos(newList)
  }

  return (
    <main className='container-fluid d-flex flex-column align-items-center justify-content-center'>
      <UploadForm videoList = {allVideos} updateVideoList = {updateVideosState}/>
      <VideoList videoList = {allVideos} updateVideoList = {updateVideosState} />
    </main>
  );
}

export default App;
