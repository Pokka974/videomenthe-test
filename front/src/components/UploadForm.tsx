import axios from "axios";
import React, { Component } from "react";
import { Button, ProgressBar, Spinner, Toast } from "react-bootstrap";
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
      compressionLevel: 1080,
      uploadPercentage: 0,
    };
  }

  // ON INPUT CHANGE
  updateFile = (file: File) => {
    this.setState({ file });
  };

  // ON SUBMIT BTN CLICK
  sendVideo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    this.props.updateShowList(false);

    const video: FormData = new FormData();
    video.append("video", this.state.file);

    // AXIOS OPTIONS TO GET THE UPLOAD PROGRESS DATA
    const options = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent });
        }
      },
    };

    const success = await axios.post(
      `${
        process.env.REACT_APP_API_URL
      }/upload/${this.state.compressionLevel.toString()}`,
      video,
      options
    );

    // WHEN SUCCESSFULLY UPLOADED
    if (success) {
      if (success.status === 200) {
        // SET UPLOAD PERCENTAGE TO 0
        this.setState({ uploadPercentage: 100 }, () => {
          setTimeout(() => {
            this.setState({ uploadPercentage: 0 });
            this.props.updateShowList(true);
          }, 1000);
        });

        // SEND A TOAST
        this.setState({ successToast: true });

        // UPDATE <APP> NEW VIDEO STATE
        let newVideo: Video = await {
          id: this.props.videoList.length,
          filename: success.data.filename,
        };

        this.props.updateNewVideo(newVideo);
      }
    } else {
      console.error("Un erreur est survenue");
    }

    // EMPTY THE INPUT
    this.setState({ file: {} as File });
  };

  // RESOLUTION SELECTION
  onResSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ compressionLevel: parseInt(e.target.value) });
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

        {this.state.uploadPercentage === 0 && (
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

        {this.state.uploadPercentage > 0 && (
          <div className="d-flex flex-column justify-content-center align-items-center gap-3 w-100">
            <ProgressBar
              className="w-100"
              now={this.state.uploadPercentage}
              label={`${this.state.uploadPercentage}%`}
            />
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    );
  }
}
