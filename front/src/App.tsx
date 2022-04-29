import UploadForm from './components/UploadForm';
import 'bootstrap/dist/css/bootstrap.min.css'
import VideoList from './components/VideoList';
import { useEffect, useState } from 'react';
import Video from './interfaces/Video';

function App() {

  const [allVideos, setAllVideos] = useState<Video[]>([])
  
  useEffect(() => {
    console.log('Video list: ',allVideos);
  }, [allVideos])

  const updateVideosState = async (newList : Video[]) => {
    await setAllVideos(newList)
  }
  return (
    <main className='container-fluid d-flex flex-column align-items-center justify-content-center'>
      <UploadForm videoList = {allVideos} updateVideoList = {updateVideosState}/>
      <VideoList videoList = {allVideos} updateVideoList = {updateVideosState} />
      
    </main>
  );
}

export default App;
