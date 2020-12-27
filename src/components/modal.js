import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalExerciseTracker = ({
  show,
  handleClose = () => (show = false),
  handleOk = () => (show = false),
  title = "Exercise Tracker",
  body,
  close = true,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {close && (
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        )}
        <Button variant="primary" onClick={handleOk}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalExerciseTracker;
