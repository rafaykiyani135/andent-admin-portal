import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "pdfjs-dist/build/pdf.worker.entry";
import { Document, Page } from "react-pdf";
function PdfPreview({
  previewPdf,
  setPreviewPdf,
  previewFileName,
  previewFileUrl,
}) {
  const handleClose = () => setPreviewPdf(false);

  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Modal size="lg" show={previewPdf} onHide={handleClose} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{previewFileName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="previewContainer">
          <Document file={previewFileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PdfPreview;
