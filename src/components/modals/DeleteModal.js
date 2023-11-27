import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModal({ showModal, setShowModal, modalDescription, onConfirm }) {
  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleClose} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalDescription}</Modal.Body>
      <Modal.Footer>
        <Button className="px-4 me-4" variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button className="px-4" variant="danger" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
