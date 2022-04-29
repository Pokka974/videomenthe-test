import axios from 'axios'
import React, { Component } from 'react'
import { Button, Toast } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Video from '../interfaces/Video'

export default class UploadForm extends Component<{videoList: Video[], updateVideoList: (videos: Video[]) => void}, {file: File, successToast: boolean}> {

     constructor(props: any) {
          super(props)
          this.state = {
               file : {} as File,
               successToast : false
          }
     }

     updateFile = (file: File) => {
          console.log(file);
          this.setState((state) => ({file}))
     }

     sendVideo = async (e : React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()

          const video : FormData = new FormData()

          video.append('video', this.state.file)

          const success = await axios.post('http://localhost:8000/upload/', video)
          if (success) {
               this.setState((state) => ({ successToast : true }))
               let newVideo : Video = {
                    id : this.props.videoList.length,
                    filename : success.data.filename
               }

               let tmpVideoList : Video[] = this.props.videoList
               tmpVideoList.push(newVideo)
               this.props.updateVideoList(tmpVideoList)
          }
          this.setState((state) => ({ file: {} as File}))
     }

     render() {
          return (
               <div className='container-fluid px-5'>
                    { this.state.successToast && (
                         <Toast onClose={() => {
                              this.setState(() => ({ successToast: false }))
                         }}>
                              <Toast.Header>
                                   <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                   <strong className="me-auto">Bootstrap</strong>
                                   <small>11 mins ago</small>
                              </Toast.Header>
                              <Toast.Body>Success !</Toast.Body>
                         </Toast>
                    )}
                    <Form.Group controlId="formFileLg" className="mb-3 flex">
                         <Form.Label>Selectionnez le ou les fichiers à compresser:</Form.Label>
                         <Form.Control onChange={ (e: React.ChangeEvent<HTMLInputElement>)  => {
                              if(!e.currentTarget.files) { return }
                              
                              const file = e.currentTarget.files[0]
                              if (file.type.includes('video')) {
                                   this.updateFile(file)
                              } else {
                                   window.alert('Seulement les fichiers vidéos sont acceptés')
                                   e.target.value = ''
                              }
                         } } className='mb-2' type="file" size="lg" name='video' multiple/>
                         <Button onClick={this.sendVideo} className='btn-success' type="submit">Envoyer</Button>
                    </Form.Group>
               </div>
               
          )
     }
}
