import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Spinner,
  Toast,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Video from "../interfaces/IVideo";
import IUploadForm from "../interfaces/IUploadForm";
import IVideosProps from "../interfaces/IVideosProps";
export default class UploadForm extends Component<IVideosProps, IUploadForm> {
  constructor(props: IVideosProps) {
    super(props);
    this.state = {
      file: {} as File,
      successToast: false,
      isLoading: false,
      compressionLevel: 1080,
    };
  }

  // ON INPUT CHANGE
  updateFile = (file: File) => {
    this.setState((state) => ({ file }));
  };

  // ON SUBMIT BTN CLICK
  sendVideo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // LOADING SPINNER ON
    this.setState((state) => ({ isLoading: true }));

    const video: FormData = new FormData();
    video.append("video", this.state.file);

    const success = await axios.post(
      `${
        process.env.REACT_APP_API_URL
      }/upload/${this.state.compressionLevel.toString()}`,
      video
    );

    if (success) {
      // LOADING SPINNER OFF
      this.setState((state) => ({ isLoading: false }));

      // SEND A TOAST
      this.setState((state) => ({ successToast: true }));

      // UPDATE <APP> STATE
      let newVideo: Video = await {
        id: this.props.videoList.length,
        filename: success.data.filename,
      };

      let tmpVideoList: Video[] = this.props.videoList;
      tmpVideoList.push(newVideo);

      this.props.updateVideoList(tmpVideoList);
    } else {
      console.error("Un erreur est survenue");
    }

    // EMPTY THE INPUT
    this.setState((state) => ({ file: {} as File }));
  };

  onResSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState((state) => ({ compressionLevel: parseInt(e.target.value) }));
  };
  render() {
    return (
      <div className="container-fluid px-5 m-auto d-flex flex-column justify-content-center align-items-center">
        {this.state.successToast && (
          <Toast
            onClose={() => {
              this.setState(() => ({ successToast: false }));
            }}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Upload Result :</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Success !</Toast.Body>
          </Toast>
        )}

        {!this.state.isLoading && (
          <Form.Group
            controlId="formFileLg"
            className="mb-3 d-flex flex-column justify-content-center align-items-center gap-4 w-100"
          >
            <Form.Label>
              Selectionnez le ou les fichiers à compresser:
            </Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.currentTarget.files) {
                  return;
                }

                const file = e.currentTarget.files[0];
                if (
                  file.type.includes("mp4") ||
                  file.type.includes("ogg") ||
                  file.type.includes("webm")
                ) {
                  this.updateFile(file);
                } else {
                  window.alert(
                    "Seulement les fichiers vidéos (mp4, ogg et webm) sont acceptés"
                  );
                  e.target.value = "";
                }
              }}
              className="mb-2"
              type="file"
              size="lg"
              name="video"
            />
            <Form.Select
              onChange={(e) => this.onResSelect(e)}
              aria-label="Default select"
            >
              <option>Choisir une résolution de compression : </option>
              <option value="1080">1080</option>
              <option value="768">768</option>
              <option value="480">480</option>
            </Form.Select>
            <Button
              onClick={this.sendVideo}
              className="btn-success w-50"
              type="submit"
            >
              Envoyer
            </Button>
          </Form.Group>
        )}

        {this.state.isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}
