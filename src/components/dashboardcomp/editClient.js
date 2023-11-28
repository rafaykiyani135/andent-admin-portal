import upload from "../../assets/data/upload.png";
import download from "../../assets/data/download.png";
import del from "../../assets/data/delete.png";
import add from "../../assets/data/add.png";
import { useRef, useState } from "react";
import mail from "../../assets/data/mailicon.png";
import phone from "../../assets/data/phone.png";
import { useEffect, useContext } from "react";
import { countries, statuses } from "../../constants";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import {
  updateClient,
  uploadClientFile,
  deleteClientFile,
  getClients,
} from "../../services/api/clients";
import { capitalizeFirstLetter } from "../../services/helperFunctions";
import useData from "../../hooks/useData";
import { isValidNumber } from "../../services/helperFunctions";
import DeleteModal from "../modals/DeleteModal";
import { getClientById } from "../../services/api/clients";
function EditClient(props) {
  const { editClientId, setPopUpIsOpen } = props;
  const [clientData, setClientData] = useState([]);
  const { clientStatuses } = useData();
  const [viewMore, setViewMore] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [pana, setPana] = useState([]);
  const [invoiceName, setInvoiceName] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [receiptName, setReceiptName] = useState("");
  const [uploadedInvoiceId, setUploadedInvoiceId] = useState("");
  const [uploadedReceiptId, setUploadedReceiptId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Select Country");
  const [clStatus, setclStatus] = useState("New");
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(AuthContext);
  const [uploadingInvoice, setUploadingInvoice] = useState(false);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [uploadingPana, setUploadingPana] = useState(false);
  const [consentForm, setConsentForm] = useState(null);
  const [cbct, setCbct] = useState(null);
  const [uploadingConcentForm, setUploadingConcentForm] = useState(false);
  const [uploadingCbct, setUploadingCbct] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [updatingClient, setUpdatingClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileTypeToBeDeleted, setFileTypeToBeDeleted] = useState("");
  const [panaIndex, setPanaIndex] = useState(null);
  const [panaId, setPanaId] = useState("");
  useEffect(() => {
    setFirstName(clientData?.firstName);
    setLastName(clientData?.lastName);
    setEmail(clientData?.email);
    setNumber(clientData?.number);
    setNotes(clientData?.notes);
    setSelectedCountry(clientData?.country ?? "Select Country");
    setclStatus(clientData?.status ?? "New");

    const uploadedInvoice = clientData?.clientFiles?.find(
      (fileObj) => fileObj.type === "INVOICE"
    );

    uploadedInvoice && setUploadedInvoiceId(uploadedInvoice?.id);
    uploadedInvoice && setInvoice(uploadedInvoice?.url);
    uploadedInvoice && setInvoiceName(uploadedInvoice?.name);

    const uploadedReceipt = clientData?.clientFiles?.find(
      (fileObj) => fileObj.type === "RECEIPT"
    );

    uploadedReceipt && setUploadedReceiptId(uploadedReceipt?.id);
    uploadedReceipt && setReceipt(uploadedReceipt?.url);
    uploadedReceipt && setReceiptName(uploadedReceipt?.name);

    const uploadedConsent = clientData?.clientFiles?.find(
      (fileObj) => fileObj.type === "CONSENT_FORM"
    );
    uploadedConsent &&
      setConsentForm({
        url: uploadedConsent?.url,
        name: uploadedConsent?.name,
        fileId: uploadedConsent?.id,
      });
    const uploadedCBCT = clientData?.clientFiles?.find(
      (fileObj) => fileObj.type === "CBCT"
    );
    uploadedCBCT &&
      setCbct({
        url: uploadedCBCT?.url,
        name: uploadedCBCT?.name,
        fileId: uploadedCBCT?.id,
      });

    const uploadedPanoramex = clientData?.clientFiles?.filter(
      (fileObj) => fileObj.type === "PANORAMEX"
    );

    uploadedPanoramex && setPana(uploadedPanoramex);
  }, [clientData]);

  useEffect(() => {
    getClientById(editClientId)
      .then((res) => {
        setClientData(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to load Client");
      });
  }, [editClientId]);

  const handlePanoramexUpload = (e) => {
    const panoramexFiles = e.target.files;
    setUploadingPana(true);
    // Create an array to store promises for each file upload
    const uploadPromises = [];
    const responses = [];

    // Iterate over each file and create a payload for each
    for (const file of panoramexFiles) {
      const payLoad = {
        clientId: editClientId,
        file,
        type: "PANORAMEX",
        userId: user.id,
      };

      // Push the promise returned by uploadClientFile to the array
      const uploadPromise = uploadClientFile(payLoad)
        .then((res) => {
          responses.push(res.data.data); // Capture the response for each file
        })
        .catch((err) => {
          responses.push(null); // Capture null for failed uploads
        });

      uploadPromises.push(uploadPromise);
    }

    // Use Promise.all to wait for all file uploads to complete
    Promise.all(uploadPromises)
      .then(() => {
        // All files uploaded successfully
        setUploadingPana(false);
        setPana((prevPana) => [...prevPana, ...responses]);
        toast.success("All files uploaded successfully");
      })
      .catch((err) => {
        // Handle any error that occurred during the parallel uploads
        setUploadingPana(false);
        toast.error(
          err?.response?.data?.message ?? "Failed to upload one or more files"
        );
      });
  };

  useEffect(() => {
    if (window.innerWidth < 760) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStatusChange = (event) => {
    setclStatus(event.target.value);
  };

  const handleInvoiceUpload = (e) => {
    const invoiceFile = e.target.files[0];
    setUploadingInvoice(true);
    const payLoad = {
      clientId: editClientId,
      file: invoiceFile,
      type: "INVOICE",
      userId: user.id,
    };
    uploadClientFile(payLoad)
      .then((res) => {
        setUploadingInvoice(false);
        setInvoice(res?.data?.data?.url);
        setInvoiceName(res?.data?.data?.name);
        setUploadedInvoiceId(res?.data?.data?.id);
        toast.success("Invoice Uploaded");
      })
      .catch((err) => {
        setUploadingInvoice(false);
        toast.error(err?.response?.data?.message ?? "Failed to upload invoice");
      });
  };

  const handleReceiptChange = (e) => {
    const receiptFile = e.target.files[0];
    setUploadingReceipt(true);
    const payLoad = {
      clientId: editClientId,
      file: receiptFile,
      type: "RECEIPT",
      userId: user.id,
    };
    uploadClientFile(payLoad)
      .then((res) => {
        setUploadingReceipt(false);
        setReceipt(res?.data?.data?.url);
        setReceiptName(res?.data?.data?.name);
        setUploadedReceiptId(res?.data?.data?.id);
        toast.success("Receipt Uploaded");
      })
      .catch((err) => {
        setUploadingReceipt(false);
        toast.error(err?.response?.data?.message ?? "Failed to upload receipt");
      });
  };

  const handleConcentFormUpload = (e) => {
    const formFile = e.target.files[0];
    setUploadingConcentForm(true);
    const payLoad = {
      clientId: editClientId,
      file: formFile,
      type: "CONSENT_FORM",
      userId: user.id,
    };
    uploadClientFile(payLoad)
      .then((res) => {
        setUploadingConcentForm(false);
        setConsentForm({
          url: res?.data?.data?.url,
          name: res?.data?.data?.name,
          fileId: res?.data?.data?.id,
        });
        toast.success("Consent Form Uploaded");
      })
      .catch((err) => {
        setUploadingConcentForm(false);
        toast.error(
          err?.response?.data?.message ?? "Failed to upload Consent Form"
        );
      });
  };
  const handleCbctUpload = (e) => {
    const file = e.target.files[0];
    setUploadingCbct(true);
    const payLoad = {
      clientId: editClientId,
      file: file,
      type: "CBCT",
      userId: user.id,
    };
    uploadClientFile(payLoad)
      .then((res) => {
        setUploadingCbct(false);
        setCbct({
          url: res?.data?.data?.url,
          name: res?.data?.data?.name,
          fileId: res?.data?.data?.id,
        });
        toast.success("CBCT Uploaded");
      })
      .catch((err) => {
        setUploadingCbct(false);
        toast.error(err?.response?.data?.message ?? "Failed to upload CBCT");
      });
  };

  const handleFileDelete = () => {
    setShowModal(false);
    if (fileTypeToBeDeleted === "INVOICE") {
      delInvoice();
    } else if (fileTypeToBeDeleted === "RECEIPT") {
      delReceipt();
    } else if (fileTypeToBeDeleted === "CONSENT_FORM") {
      delConsentForm();
    } else if (fileTypeToBeDeleted === "CBCT") {
      delCbct();
    } else if (fileTypeToBeDeleted === "PANORAMEX") {
      delPana(panaIndex, panaId);
    }
  };

  function handleClientUpdate() {
    if (
      !firstName ||
      !lastName
      //only first and last name are mandatory to keep a record
      //!email ||
      //!number ||
      //!notes ||
      //!selectedCountry ||
      //!clStatus
    ) {
      toast.error("Fill First and Last Name");
    } else if (number && !isValidNumber(number)) {
      toast.error("Number is not valid");
    } else if (number && number.length < 6) {
      toast.error("Number can not have less than 6 characters");
    } else {
      const payLoad = {
        id: editClientId,
        firstName,
        lastName,
        email,
        number,
        notes,
        country: selectedCountry,
        status: clStatus,
        source: clientData?.source ?? "Manual Entry",
      };
      setUpdatingClient(true);
      updateClient(payLoad)
        .then((res) => {
          setUpdatingClient(false);
          toast.success("Client updated Successfully");
          setPopUpIsOpen(false);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ?? "Failed to update client"
          );
          setUpdatingClient(false);
        });
    }
  }

  const delInvoice = () => {
    if (uploadedInvoiceId) {
      deleteClientFile(uploadedInvoiceId)
        .then((res) => {
          toast.success("Invoice deleted succcessfully");
          setInvoice(null);
          setInvoiceName("");
          setUploadedInvoiceId("");
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ?? "Failed to delete invoice"
          );
        });
    }
  };

  const delReceipt = () => {
    if (uploadedReceiptId) {
      deleteClientFile(uploadedReceiptId)
        .then((res) => {
          toast.success("Receipt deleted successfully");
          setReceipt(null);
          setReceiptName("");
          setUploadedReceiptId("");
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ?? "Failed to delte receipt"
          );
        });
    }
  };

  const delConsentForm = () => {
    if (consentForm) {
      deleteClientFile(consentForm.fileId)
        .then((res) => {
          toast.success("Consent form deleted successfully");
          setConsentForm(null);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ?? "Failed to delete consent form"
          );
        });
    }
  };
  const delCbct = () => {
    if (cbct) {
      deleteClientFile(cbct.fileId)
        .then((res) => {
          toast.success("CBCT deleted successfully");
          setCbct(null);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message ?? "Failed to delete CBCT");
        });
    }
  };

  const delPana = (index, fileId) => {
    if (pana?.length === 2) {
      setViewMore(false);
    }
    deleteClientFile(fileId)
      .then((res) => {
        toast.success("Panoramex deleted successfully");
        setPana((prevPana) => {
          const updatedPana = [...prevPana];
          updatedPana.splice(index, 1); // Remove the file at the specified index
          return updatedPana;
        });
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ?? "Failed to delete Panoramex"
        );
      });
  };

  return (
    <>
      <div className="row justify-content-center text-center">
        <div className="col-lg-12 col-12">
          <h2 className="popup-heading">
            {capitalizeFirstLetter(clientData?.firstName)}{" "}
            {capitalizeFirstLetter(clientData?.lastName)}
          </h2>
        </div>
      </div>
      <h1 className="closeBtn" onClick={() => setPopUpIsOpen(false)}>
        &times;
      </h1>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        <div className="col-12 col-md-6 text-start">
          <div>
            <h2 className="popup-heading-2 text-start">First Name</h2>
            <input
              className="popup-inputs-small"
              placeholder="Enter First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          {isMobile ? (
            <div style={{ marginTop: "8px" }}>
              <h2 className="popup-heading-2 text-start">Last Name</h2>
              <input
                className="popup-inputs-small"
                placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          ) : (
            <div style={{ marginTop: "8px" }}>
              <h2 className="popup-heading-2 text-start">Email</h2>
              <input
                className="popup-inputs-small"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ paddingRight: "30px" }}
              />
              <img
                src={mail}
                alt="mail-icon"
                className="small-icon client-mail-icon"
              />
            </div>
          )}
          {isMobile ? (
            <div style={{ marginTop: "8px" }}>
              <h2 className="popup-heading-2 text-start">Number</h2>
              <input
                className="popup-inputs-small"
                placeholder="Enter number"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                style={{ paddingRight: "30px" }}
              />
              <img
                src={phone}
                alt="mail-icon"
                className="small-icon client-mail-icon"
              />
            </div>
          ) : (
            <div style={{ marginTop: "8px" }}>
              <h2 className="popup-heading-2 text-start">Country</h2>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="popup-inputs-small-dropdown"
              >
                {countries.map((country, index) => (
                  <option key={index}>{country}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="col-md-6 col-12 text-start mob-top-pad">
          {isMobile ? (
            <div>
              <h2 className="popup-heading-2 text-start">Email</h2>
              <input
                className="popup-inputs-small"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ paddingRight: "30px" }}
              />
              <img
                src={mail}
                alt="mail-icon"
                className="small-icon client-mail-icon"
              />
            </div>
          ) : (
            <div>
              <h2 className="popup-heading-2 text-start">Last Name</h2>
              <input
                className="popup-inputs-small"
                placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          )}
          {isMobile ? (
            <div style={{ marginTop: "8px" }}>
              <h2 className="popup-heading-2 text-start">Country</h2>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="popup-inputs-small-dropdown"
              >
                {countries.map((country, index) => (
                  <option key={index} value={country} disabled={index === 0}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div style={{ marginTop: "8px" }}>
              <h2 className="popup-heading-2 text-start">Number</h2>
              <input
                className="popup-inputs-small"
                placeholder="Enter number"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                style={{ paddingRight: "30px" }}
              />
              <img
                src={phone}
                alt="mail-icon"
                className="small-icon client-mail-icon"
              />
            </div>
          )}
        </div>

        <div
          className="row justify-content-start new-client-updated-pad2"
          style={{ width: "100%" }}
        >
          <div className="col-12 col-lg-12 text-start">
            <h2
              className="popup-heading-2 text-start"
              style={{ fontSize: "14px" }}
            >
              Upload Format (Jpg, Png, Pdf)
            </h2>
          </div>
        </div>
        <div className="row justify-content-start" style={{ width: "100%" }}>
          {pana.length > 0 && !viewMore ? (
            <h2 className="popup-heading-3 text-start d-flex align-items-center justify-content-start">
              {pana[0].name}
              <a
                href={pana[0].url}
                download={pana[0].url}
                style={{ marginLeft: "10px" }}
              >
                <img
                  src={download}
                  alt="download-icon"
                  className="small-icon"
                />
              </a>
              <span
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  setFileTypeToBeDeleted("PANORAMEX");
                  setPanaIndex(0);
                  setPanaId(pana[0].id);
                  setShowModal(true);
                }}
              >
                <img src={del} alt="delete-icon" className="small-icon" />
              </span>
            </h2>
          ) : pana.length > 1 && viewMore ? (
            pana.map((file, index) => (
              <h2
                key={index}
                className="popup-heading-3 text-start d-flex align-items-center justify-content-start"
              >
                {file?.name}
                <a
                  href={file?.url}
                  download={file.url}
                  style={{ marginLeft: "10px" }}
                >
                  <img
                    src={download}
                    alt="download-icon"
                    className="small-icon"
                  />
                </a>
                <span
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setFileTypeToBeDeleted("PANORAMEX");
                    setPanaIndex(index);
                    setPanaId(file?.id);
                    setShowModal(true);
                  }}
                >
                  <img src={del} alt="delete-icon" className="small-icon" />
                </span>
              </h2>
            ))
          ) : (
            ""
          )}
        </div>
        <div
          className="row justify-content-start new-client-updated-pad2"
          style={{ width: "100%" }}
        >
          <div className="col-12 col-lg-10 text-start d-flex justify-content-start justify-content-md-start">
            <label
              className={`andent-button-3`}
              style={{ width: isMobile ? "auto" : "150px" }}
            >
              <h2 className="button-text">
                {uploadingPana ? "Uploading ..." : "Panoramex"}
              </h2>
              <span className="d-flex align-items-center">
                <img src={upload} alt="upload-icon" className="small-icon" />
              </span>
              <input
                onChange={handlePanoramexUpload}
                multiple
                type="file"
                style={{ display: "none" }}
              />
              {/* Button triggers file input click */}
              <button
                disabled={uploadingPana}
                type="button"
                style={{ display: "none" }}
              ></button>
            </label>
            {pana.length > 1 ? (
              <div className="col-6 col-lg-6 text-start d-flex justify-content-end align-items-center">
                <u
                  onClick={() => {
                    setViewMore(!viewMore);
                  }}
                >
                  <h2 className="popup-heading-2">
                    {viewMore ? "View Less Uploads" : "View More Uploads"}
                  </h2>
                </u>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          className="row justify-content-start text-center new-client-updated-pad"
          style={{ width: isMobile ? "100%" : "50%" }}
        >
          <div className="col-lg-12 col-12 d-flex justify-content-start">
            <label
              className={`andent-button-3 ${invoice ? `button-disabled` : ``}`}
            >
              <h2 className="button-text">
                {isMobile
                  ? uploadingInvoice
                    ? "Uploading ..."
                    : "Invoice"
                  : uploadingInvoice
                  ? "Uploading ..."
                  : "Upload Invoice"}
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
          </div>
          <div className="col-lg-12 col-12 d-flex justify-content-start new-client-updated-pad2">
            {invoice ? (
              <h2 className="popup-heading-3 text-start d-flex align-items-center">
                {invoiceName}
                <a
                  href={invoice}
                  download={invoice}
                  style={{ marginLeft: "10px" }}
                >
                  <img
                    src={download}
                    alt="download-icon"
                    className="small-icon"
                  />
                </a>
                <span
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => {
                    setFileTypeToBeDeleted("INVOICE");
                    setShowModal(true);
                  }}
                >
                  <img src={del} alt="delete-icon" className="small-icon" />
                </span>
              </h2>
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-12 col-12 d-flex justify-content-start new-client-updated-pad">
            <label
              className={`andent-button-3 ${receipt ? `button-disabled` : ``}`}
            >
              <h2 className="button-text">
                {isMobile
                  ? uploadingReceipt
                    ? "Uploading"
                    : "Receipt"
                  : uploadingReceipt
                  ? "Uploading ..."
                  : "Upload Receipt"}
              </h2>
              <span className="d-flex align-items-center">
                <img src={upload} alt="upload-icon" className="small-icon" />
              </span>
              <input
                onChange={handleReceiptChange}
                type="file"
                style={{ display: "none" }}
              />
              {/* Button triggers file input click */}
              <button
                disabled={uploadingReceipt}
                type="button"
                style={{ display: "none" }}
              ></button>
            </label>
          </div>
          <div className="col-lg-12 col-12 d-flex justify-content-start justify-content-md-center new-client-updated-pad2">
            {receipt ? (
              <h2 className="popup-heading-3 text-start d-flex align-items-center justify-content-center">
                {receiptName}
                <a
                  href={receipt}
                  download={receipt}
                  style={{ marginLeft: "10px" }}
                >
                  <img
                    src={download}
                    alt="download-icon"
                    className="small-icon"
                  />
                </a>
                <span
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setFileTypeToBeDeleted("RECEIPT");
                    setShowModal(true);
                  }}
                >
                  <img src={del} alt="delete-icon" className="small-icon" />
                </span>
              </h2>
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-12 col-12 d-flex justify-content-start new-client-updated-pad">
            <label
              className={`andent-button-3 ${
                consentForm ? `button-disabled` : ``
              }`}
            >
              <h2 className="button-text">
                {uploadingConcentForm ? "Uploading ..." : "Consent Form"}
              </h2>
              <span className="d-flex align-items-center">
                <img src={upload} alt="upload-icon" className="small-icon" />
              </span>
              <input
                onChange={handleConcentFormUpload}
                type="file"
                style={{ display: "none" }}
              />
              {/* Button triggers file input click */}
              <button
                disabled={uploadingConcentForm}
                type="button"
                style={{ display: "none" }}
              ></button>
            </label>
          </div>
          <div className="col-lg-12 col-12 d-flex justify-content-start new-client-updated-pad2 ">
            {consentForm ? (
              <h2 className="popup-heading-3 text-start d-flex align-items-center justify-content-center">
                {consentForm?.name}
                <a
                  href={consentForm?.url}
                  download={consentForm?.url}
                  style={{ marginLeft: "10px" }}
                >
                  <img
                    src={download}
                    alt="download-icon"
                    className="small-icon"
                  />
                </a>
                <span
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setFileTypeToBeDeleted("CONSENT_FORM");
                    setShowModal(true);
                  }}
                >
                  <img src={del} alt="delete-icon" className="small-icon" />
                </span>
              </h2>
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-12 col-12 d-flex justify-content-start new-client-updated-pad">
            <label
              className={`andent-button-3 ${cbct ? `button-disabled` : ``}`}
            >
              <h2 className="button-text">
                {isMobile
                  ? uploadingCbct
                    ? "Uploading"
                    : "CBCT"
                  : uploadingCbct
                  ? "Uploading ..."
                  : "Upload CBCT"}
              </h2>
              <span className="d-flex align-items-center">
                <img src={upload} alt="upload-icon" className="small-icon" />
              </span>
              <input
                onChange={handleCbctUpload}
                type="file"
                style={{ display: "none" }}
              />
              {/* Button triggers file input click */}
              <button
                disabled={uploadingCbct}
                type="button"
                style={{ display: "none" }}
              ></button>
            </label>
          </div>
          <div className="col-lg-12 col-12 d-flex justify-content-start justify-content-md-center new-client-updated-pad2">
            {cbct ? (
              <h2 className="popup-heading-3 text-start d-flex align-items-center">
                {cbct?.name}
                <a
                  href={cbct?.url}
                  download={cbct?.url}
                  style={{ marginLeft: "10px" }}
                >
                  <img
                    src={download}
                    alt="download-icon"
                    className="small-icon"
                  />
                </a>
                <span
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => {
                    setFileTypeToBeDeleted("CBCT");
                    setShowModal(true);
                  }}
                >
                  <img src={del} alt="delete-icon" className="small-icon" />
                </span>
              </h2>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        <div className="col-12 col-lg-12">
          <h2 className="popup-heading-2 text-start">Client Status</h2>
        </div>
        <div className="col-12 col-lg-6">
          <select
            value={clStatus}
            onChange={handleStatusChange}
            className="popup-inputs-small-dropdown"
          >
            {clientStatuses?.map((stat, index) => (
              <option key={index} value={stat} disabled={index === 0}>
                {stat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        <div className="col-12 col-lg-12 text-start">
          <h2 className="popup-heading-2 text-start">Client Notes</h2>
        </div>
        <div className="col-lg-12 col-12 text-start">
          <textarea
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            type=""
            className="popup-inputs-4"
            placeholder="Enter Text"
            style={{ resize: "none" }}
          ></textarea>
        </div>
      </div>

      <div
        className="row justify-content-start d-flex"
        style={{ width: "100%" }}
      >
        <div
          className="col-12 col-lg-12 text-start d-flex justify-content-center"
          style={{ gap: "24px" }}
        >
          <button
            disabled={updatingClient}
            className="andent-button-3"
            onClick={handleClientUpdate}
          >
            <h2 className="button-text">
              {updatingClient ? "Updating ..." : "Update Client"}
              <span
                style={{
                  marginLeft: "8px",
                  bottom: "2px",
                  position: "relative",
                }}
              >
                <img src={add} alt="genlink icon" className="small-icon" />
              </span>
            </h2>
          </button>
        </div>
        <DeleteModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalDescription={"Are you sure you want to delete this file?"}
          onConfirm={handleFileDelete}
        />
      </div>
    </>
  );
}

export default EditClient;
