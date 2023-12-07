import download from "../../assets/data/download.png";
import del from "../../assets/data/delete.png";
import upload from "../../assets/data/upload.png";
import invwhite from "../../assets/data/invoicewhite.png";
import mailicon from "../../assets/data/mailicon.png";
import excl from "../../assets/data/exclamation.png";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { imageExtensions } from "../../constants/index";
import {
  uploadClientFile,
  deleteClientFile,
  sendInvoiceToClient,
} from "../../services/api/clients";
import { toast } from "react-toastify";
import DeleteModal from "../modals/DeleteModal";
import { getFileExtension } from "../../services/helperFunctions";
import PdfPreview from "../modals/PdfPreview";
import ImagePreview from "../modals/ImagePreview";
function Invoice(props) {
  const { id } = props.clientInvoiceData;
  const { setInvoiceOpen } = props;

  const { user } = useContext(AuthContext);
  const [invoiceIndex, setInvoiceIndex] = useState(0);
  const [invoiceId, setInvoiceId] = useState(null);
  const [uploadingInvoice, setUploadingInvoice] = useState(false);
  const [sendingInvoice, setSendingInvoice] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [invoiceFiles, setInvoiceFiles] = useState([]);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewPdf, setPreviewPdf] = useState(false);
  const [previewFileName, setPreviewFileName] = useState("");
  const [previewFileUrl, setPreviewFileUrl] = useState("");
  const [desc, setDesc] = useState(
    "Dear Sir/Ma'am,\n\nKindly review the attached invoice and let us know if you have any queries.\n\nBest Regards,\nAndent Clinic."
  );

  useEffect(() => {
    setEmail(props.clientInvoiceData.email);
  }, [props.clientInvoiceData]);

  const handleFilePreview = (fileData) => {
    const { name, url } = fileData;

    if (imageExtensions.includes(getFileExtension(name))) {
      setPreviewImage(true);
    } else if (getFileExtension(name) === "pdf") {
      setPreviewPdf(true);
    }

    setPreviewFileName(name);
    setPreviewFileUrl(url);
  };

  const handleInvoiceUpload = (e) => {
    setUploadingInvoice(true);
    const files = e.target.files;
    const allowedExtensions = [
      "pdf",
      "jpg",
      "jpeg",
      "png",
      "PDF",
      "JPG",
      "JPEG",
      "PNG",
    ];

    // Create an array to store promises for each file upload
    const uploadPromises = [];
    const responses = [];
    let anyInvalidFile = false;
    // Iterate over each file and create a payload for each
    for (const file of files) {
      const fileExtension = getFileExtension(file.name);
      if (allowedExtensions.includes(fileExtension)) {
        const payLoad = {
          clientId: id,
          file,
          type: "INVOICE",
          userId: user.id,
        };
        const uploadPromise = uploadClientFile(payLoad)
          .then((res) => {
            responses.push(res.data.data); // Capture the response for each file
          })
          .catch((err) => {
            responses.push(null);
          });

        uploadPromises.push(uploadPromise);
      } else {
        setUploadingInvoice(false);
        toast.error("Supported file formats : png,jpg,jpeg & pdf");
        anyInvalidFile = true;
      }
    }

    console.log(anyInvalidFile, uploadPromises.length);

    if (anyInvalidFile && uploadPromises.length > 1) {
      toast.success("Files with valid format are uploaded");
    } else if (anyInvalidFile && uploadPromises.length === 1) {
      toast.success("File with valid format is uploaded");
    } else if (!anyInvalidFile && uploadPromises.length > 1) {
      toast.success("All files uploaded Successfully");
    } else if (!anyInvalidFile && uploadPromises.length === 1) {
      toast.success("File Uploaded Successfully");
    }

    uploadPromises.length > 0 &&
      Promise.all(uploadPromises)
        .then(() => {
          // All files uploaded successfully
          setUploadingInvoice(false);
          setInvoiceFiles((prevFiles) => [...prevFiles, ...responses]);
        })
        .catch((err) => {
          // Handle any error that occurred during the parallel uploads
          setInvoiceFiles((prevFiles) => [...prevFiles, ...responses]);
          setUploadingInvoice(false);
          toast.error(
            err?.response?.data?.message ||
              err.message ||
              "Failed to upload one or more files"
          );
        });
  };

  useEffect(() => {
    console.log(invoiceFiles);
  }, [invoiceFiles]);

  const delInvoice = () => {
    setShowModal(false);
    deleteClientFile(invoiceId)
      .then((res) => {
        toast.success("Invoice deleted successfully");
        setInvoiceFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          updatedFiles.splice(invoiceIndex, 1); // Remove the file at the specified index
          return updatedFiles;
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to delete Invoice");
      });
  };

  function handleInvoiceSending() {
    if (!desc) {
      toast.error("Please enter description");
      return;
    }
    if (!invoiceFiles) {
      toast.error("Please upload invoice file");
      return;
    }
    const payLoad = {
      email,
      subject: "Andent incoive for your dental procedure",
      body: desc,
      clientId: id,
      clientFileIds: invoiceFiles?.map((file) => file?.id),
      userId: user.id,
    };
    setSendingInvoice(true);
    sendInvoiceToClient(payLoad)
      .then((res) => {
        setSendingInvoice(false);
        toast.success("Invoice Sent to Client");
        setInvoiceOpen(false);
      })
      .catch((err) => {
        setSendingInvoice(false);
        toast.error(
          err?.response?.data?.message ?? "Failed to send the invoice"
        );
      });
  }

  return (
    <>
      <div className="row justify-content-center text-center">
        <div className="col-lg-12 col-12">
          <h2 className="popup-heading">Send Invoice</h2>
        </div>
      </div>
      <h1 className="closeBtn" onClick={() => setInvoiceOpen(false)}>
        &times;
      </h1>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        <div className="col-12 col-lg-12 text-start">
          <h2 className="popup-heading-2 text-start">Client Email</h2>
        </div>
        <div className="col-lg-12 col-12 text-start">
          <div className="d-flex align-items-center">
            <input
              className="popup-inputs"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <img
              src={mailicon}
              alt="mail-icon"
              className="small-icon"
              style={{ position: "absolute", right: "40px" }}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        <div className="col-12 col-lg-12 text-start">
          <h2 className="popup-heading-2 text-start">Subject</h2>
        </div>
        <div className="col-lg-12 col-12 text-start">
          <div className="popup-inputs popup-heading-2 d-flex align-items-center invoice-sub-height">
            Andent Invoice for your dental procedure
            <img
              src={excl}
              alt="mail-icon"
              className="small-icon"
              style={{ position: "absolute", right: "40px" }}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        <div className="col-12 col-lg-12 text-start">
          <h2 className="popup-heading-2 text-start">Description</h2>
        </div>
        <div className="col-lg-12 col-12 text-start">
          <textarea
            type=""
            className="popup-inputs-2"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            style={{ resize: "none", fontSize: "14px" }}
          ></textarea>
        </div>
      </div>
      {invoiceFiles?.map((file, index) => (
        <h2
          key={index}
          className="popup-heading-3 text-start d-flex align-items-center justify-content-start"
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleFilePreview(file)}
          >
            {file?.name}
          </span>

          <a
            href={file?.url}
            download={file?.url}
            style={{ marginLeft: "10px" }}
          >
            <img src={download} alt="download-icon" className="small-icon" />
          </a>
          <span
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setInvoiceIndex(index);
              setInvoiceId(file?.id);
              setShowModal(true);
            }}
          >
            <img src={del} alt="delete-icon" className="small-icon" />
          </span>
        </h2>
      ))}
      <div
        className="row justify-content-start d-flex"
        style={{ width: "100%" }}
      >
        <div
          className="col-12 col-lg-12 text-start d-flex justify-content-center"
          style={{ gap: "24px" }}
        >
          <label className="andent-button">
            <h2 className="button-text d-flex text-center">
              {uploadingInvoice ? "Uploading" : "Upload Invoice"}
            </h2>
            <span className="d-flex align-items-center">
              <img src={upload} alt="upload-icon" className="small-icon" />
            </span>
            <input
              id="my-file"
              multiple
              onChange={handleInvoiceUpload}
              type="file"
              style={{ display: "none" }}
            />
            {/* Button triggers file input click */}
            <button
              disabled={uploadingInvoice}
              type="button"
              style={{ display: "none" }}
            ></button>
          </label>

          <button className="andent-button" onClick={handleInvoiceSending}>
            <h2 className="button-text">
              {sendingInvoice ? "Sending ..." : "Send Invoice"}
            </h2>
            <span className="d-flex align-items-center">
              <img src={invwhite} alt="genlink icon" className="small-icon" />
            </span>
          </button>
        </div>

        <DeleteModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalDescription={"Are you sure you want to delete this file?"}
          onConfirm={delInvoice}
        />
        <ImagePreview
          {...{
            previewImage,
            setPreviewImage,
            previewFileName,
            previewFileUrl,
          }}
        />
        <PdfPreview
          {...{
            previewPdf,
            setPreviewPdf,
            previewFileName,
            previewFileUrl,
          }}
        />
      </div>
    </>
  );
}

export default Invoice;
