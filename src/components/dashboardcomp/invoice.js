import download from "../../assets/data/download.png";
import del from "../../assets/data/delete.png";
import upload from "../../assets/data/upload.png";
import invwhite from "../../assets/data/invoicewhite.png";
import mailicon from "../../assets/data/mailicon.png";
import excl from "../../assets/data/exclamation.png";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import {
  uploadClientFile,
  deleteClientFile,
  sendInvoiceToClient,
} from "../../services/api/clients";
import { toast } from "react-toastify";
import DeleteModal from "../modals/DeleteModal";

function Invoice(props) {
  const { email, id } = props.clientInvoiceData;
  const { setInvoiceOpen } = props;
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadingInvoice, setUploadingInvoice] = useState(false);
  const [uploadedInvoiceId, setUploadedInvoiceId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [desc, setDesc] = useState(
    "Dear Sir/Ma'am,\n\nKindly review the attached invoice and let us know if you have any queries.\n\nBest Regards,\nAndent Clinic."
  );

  const handleInvoiceUpload = (e) => {
    const invoiceFile = e.target.files[0];
    setUploadingInvoice(true);
    const payLoad = {
      clientId: id,
      file: invoiceFile,
      type: "INVOICE",
      userId: user.id,
    };
    uploadClientFile(payLoad)
      .then((res) => {
        setUploadingInvoice(false);
        setFile(res?.data?.data?.url);
        setFileName(res?.data?.data?.name);
        setUploadedInvoiceId(res?.data?.data?.id);
        toast.success("Invoice Uploaded");
      })
      .catch((err) => {
        setUploadingInvoice(false);
        toast.error(err?.response?.data?.message ?? "Failed to upload invoice");
      });
  };
  const delInvoice = () => {
    setShowModal(false);
    if (uploadedInvoiceId) {
      deleteClientFile(uploadedInvoiceId)
        .then((res) => {
          toast.success("Invoice deleted succcessfully");
          setFile(null);
          setFileName("");
          setUploadedInvoiceId("");
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ?? "Failed to delete invoice"
          );
        });
    }
  };

  function handleInvoiceSending() {
    if (!desc) {
      toast.error("Please enter description");
      return;
    }
    if (!file) {
      toast.error("Please upload invoice file");
      return;
    }
    const payLoad = {
      email,
      subject: "Andent incoive for your dental procedure",
      description: desc,
      body: desc,
      clientId: id,
      clientFileId: uploadedInvoiceId,
      url: file,
      userId: user.id,
    };
    sendInvoiceToClient(payLoad)
      .then((res) => {
        toast.success("Invoice Sent to Client");
        setFile("");
        setFileName("");
        setUploadedInvoiceId("");
        setInvoiceOpen(false);
      })
      .catch((err) => {
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
              placeholder={email}
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
      {file ? (
        <div className="row justify-content-start" style={{ width: "100%" }}>
          <div className="col-12 col-lg-12 text-start">
            <h2 className="popup-heading-3 text-start d-flex align-items-center">
              {fileName}
              <a href={file} download={file} style={{ marginLeft: "10px" }}>
                <img
                  src={download}
                  alt="download-icon"
                  className="small-icon"
                />
              </a>
              <span
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => setShowModal(true)}
              >
                <img src={del} alt="delete-icon" className="small-icon" />
              </span>
            </h2>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className="row justify-content-start d-flex"
        style={{ width: "100%" }}
      >
        <div
          className="col-12 col-lg-12 text-start d-flex justify-content-center"
          style={{ gap: "24px" }}
        >
          <label className={`andent-button ${file ? `button-disabled` : ``}`}>
            <h2 className="button-text d-flex text-center">
              {uploadingInvoice ? "Uploading" : "Upload Invoice"}
            </h2>
            <span className="d-flex align-items-center">
              <img src={upload} alt="upload-icon" className="small-icon" />
            </span>
            <input
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
            <h2 className="button-text">Send Invoice</h2>
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
      </div>
    </>
  );
}

export default Invoice;
