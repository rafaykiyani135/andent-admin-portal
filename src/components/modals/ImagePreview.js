import Modal from "react-bootstrap/Modal";

function ImagePreview({
  previewImage,
  setPreviewImage,
  previewFileName,
  previewFileUrl,
}) {
  const handleClose = () => setPreviewImage(false);

  return (
    <Modal size="lg" show={previewImage} onHide={handleClose} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{previewFileName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="previewContainer">
          <img src={previewFileUrl} alt={previewFileName} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ImagePreview;
