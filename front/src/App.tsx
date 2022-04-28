import UploadForm from './components/UploadForm';
import 'bootstrap/dist/css/bootstrap.min.css'
import VideoList from './components/VideoList';
import { useEffect, useState } from 'react';
import zip from 'jszip'

// import extract from 'extract-zip'

// const extract = require('extract-zip')
function App() {
  
  const [allVideos, setAllVideos] = useState({})

  useEffect(()  => {
    const fetchData = async () => {
      const res : Response =  await fetch('http://localhost:8000/files/')
      if (res) {
        const blob : Blob = await res.blob()
        const file : File = new File([blob], 'videosArchives.zip') 
        try {
          // await extract(file.name, { dir: '../public/videos/' })
          const extracted : zip = await zip.loadAsync(file)
          if (extracted) {
            setAllVideos(extracted.files)
          }
            
        } catch (err) {
          // handle any errors
        }
        console.log(allVideos);
      }
    }
    
    fetchData()

  }, [])

  return (
    <main className='container-fluid d-flex flex-column align-items-center justify-content-center'>
      <UploadForm />
      <VideoList />
      {/* VideoPlayer */}
    </main>
  );
}

export default App;
