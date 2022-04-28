import UploadForm from './components/UploadForm';
import 'bootstrap/dist/css/bootstrap.min.css'
import VideoList from './components/VideoList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Video from './interfaces/Video';

function App() {

  const [allVideos, setAllVideos] = useState<Video[]>([])
  
  useEffect(()  => {
    refreshList()
  }, [])

  const refreshList = () => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8000/files/')
      setAllVideos(res.data)
    }
    fetchData()
  }

  return (
    <main className='container-fluid d-flex flex-column align-items-center justify-content-center'>
      <UploadForm refresh={() => refreshList()} />
      <VideoList videos={allVideos} />
      
    </main>
  );
}

export default App;
