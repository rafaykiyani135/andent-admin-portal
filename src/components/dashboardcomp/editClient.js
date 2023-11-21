import upload from "../../assets/data/upload.png";
import download from "../../assets/data/download.png";
import del from "../../assets/data/delete.png";
import add from "../../assets/data/add.png";
import { useRef, useState } from "react";
import mail from "../../assets/data/mailicon.png";
import phone from "../../assets/data/phone.png";
import { useEffect, useContext } from "react";
import { countries, statuses } from "../../constants";
import { uploadClientFile } from "../../services/api/clients";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import { updateClient } from "../../services/api/clients";
import { capitalizeFirstLetter } from "../../services/helperFunctions";
function EditClient(props) {
  const { editClientId, setPopUpIsOpen, clientData } = props;

  const [viewMore, setViewMore] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [pana, setPana] = useState([]);
  const [invoiceName, setInvoiceName] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [receiptName, setReceiptName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(clientData.country);
  const [clStatus, setclStatus] = useState(clientData.status);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(AuthContext);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [firstName, setFirstName] = useState(clientData.firstName);
  const [lastName, setLastName] = useState(clientData.lastName);
  const [email, setEmail] = useState(clientData.email);
  const [number, setNumber] = useState(clientData.number);
  const [clientNotes, setClientNotes] = useState(clientData.clientNotes);
  const [updatingClient, setUpdatingClient] = useState(false);

  const handlePanoramexUpload = (e) => {
    const panoramexFiles = e.target.files;
    setUploadingFiles(true);
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
        setUploadingFiles(false);
        const newFilesArray = Array.from(panoramexFiles);
        setPana((prevPana) => [...prevPana, ...newFilesArray]);
        toast.success("All files uploaded successfully");
      })
      .catch((err) => {
        // Handle any error that occurred during the parallel uploads
        setUploadingFiles(false);
        toast.error("Failed to upload one or more files");
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
    setUploadingFiles(true);
    const payLoad = {
      clientId: editClientId,
      file: invoiceFile,
      type: "INVOICE",
      userId: user.id,
    };
    uploadClientFile(payLoad)
      .then((res) => {
        setUploadingFiles(false);
        setInvoice(invoiceFile);
        setInvoiceName(invoiceFile?.name);
        toast.success("Invoice Uploaded");
      })
      .catch((err) => {
        setUploadingFiles(false);
        toast.error("Failed to upload invoice");
      });
  };

  const handleReceiptChange = (e) => {
    const receiptFile = e.target.files[0];
    setUploadingFiles(true);
    const payLoad = {
      clientId: editClientId,
      file: receiptFile,
      type: "RECEIPT",
      userId: user.id,
    };
    uploadClientFile(payLoad)
      .then((res) => {
        setUploadingFiles(false);
        setReceipt(receiptFile);
        setReceiptName(receiptFile?.name);
        toast.success("Receipt Uploaded");
      })
      .catch((err) => {
        setUploadingFiles(false);
        toast.error("Failed to upload receipt");
      });
  };

  function handleClientCreate() {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !number ||
      !clientNotes ||
      !selectedCountry ||
      !clStatus
    ) {
      toast.error("Fill all the fields");
    } else {
      const payLoad = {
        id: editClientId,
        firstName,
        lastName,
        email,
        number,
        clientNotes,
        country: selectedCountry,
        status: clStatus,
        source: "Manual Entry",
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
            err?.response?.data?.message || "Failed to update client"
          );
          setUpdatingClient(false);
        });
    }
  }

  const delInvoice = () => {
    setInvoice(null);
    setInvoiceName("");
  };

  const delReceipt = () => {
    setReceipt(null);
    setReceiptName("");
  };

  const delPana = (index) => {
    if (pana.length === 2) {
      setViewMore(false);
    }
    setPana((prevPana) => {
      const updatedPana = [...prevPana];
      updatedPana.splice(index, 1); // Remove the file at the specified index
      return updatedPana;
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
                value={clientData?.country}
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
          className="row justify-content-center text-center"
          style={{ marginTop: "12px" }}
        >
          <div className="col-lg-6 col-12 d-flex justify-content-start">
            {invoice ? (
              <h2 className="popup-heading-3 text-start d-flex align-items-center">
                {invoiceName}
                <a
                  href={invoice}
                  download={invoiceName}
                  style={{ marginLeft: "10px" }}
                >
                  <img
                    src={download}
                    alt="download-icon"
                    className="small-icon"
                  />
                </a>
                <span style={{ marginLeft: "10px" }} onClick={delInvoice}>
                  <img src={del} alt="delete-icon" className="small-icon" />
                </span>
              </h2>
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-6 col-12 d-flex justify-content-start justify-content-md-center">
            {receipt ? (
              <h2 className="popup-heading-3 text-start d-flex align-items-center justify-content-center">
                {receiptName}
                <a
                  href={receipt}
                  download={receiptName}
                  style={{ marginLeft: "10px" }}
                >
                  <img
                    src={download}
                    alt="download-icon"
                    className="small-icon"
                  />
                </a>
                <span style={{ marginLeft: "10px" }} onClick={delReceipt}>
                  <img src={del} alt="delete-icon" className="small-icon" />
                </span>
              </h2>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          className="row justify-content-center text-center"
          style={{ marginTop: "12px" }}
        >
          <div className="col-lg-6 col-6 d-flex justify-content-center">
            <label
              className={`andent-button ${invoice ? `button-disabled` : ``}`}
            >
              <h2 className="button-text">
                {isMobile
                  ? uploadingFiles
                    ? "Uploading ..."
                    : "Invoice"
                  : uploadingFiles
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
                disabled={uploadingFiles}
                type="button"
                style={{ display: "none" }}
              ></button>
            </label>
          </div>
          <div className="col-lg-6 col-6 d-flex justify-content-center">
            <label
              className={`andent-button ${receipt ? `button-disabled` : ``}`}
            >
              <h2 className="button-text">
                {isMobile
                  ? uploadingFiles
                    ? "Uploading"
                    : "Receipt"
                  : uploadingFiles
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
                disabled={uploadingFiles}
                type="button"
                style={{ display: "none" }}
              ></button>
            </label>
          </div>
        </div>
      </div>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        <div className="col-12 col-lg-12">
          <h2 className="popup-heading-2 text-start">Client Status</h2>
        </div>
        <div className="col-12 col-lg-6">
          <select
            onChange={handleStatusChange}
            value={clientData?.status}
            className="popup-inputs-small-dropdown"
          >
            {statuses.map((stat, index) => (
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
            onChange={(e) => setClientNotes(e.target.value)}
            value={clientNotes}
            type=""
            className="popup-inputs-4"
            placeholder="Enter Text"
            style={{ resize: "none" }}
          ></textarea>
        </div>
      </div>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        <div className="col-12 col-lg-12 text-start">
          <h2
            className="popup-heading-2 text-start"
            style={{ fontSize: "14px" }}
          >
            Upload Panoramex (Jpg, Png, Pdf)
          </h2>
        </div>
      </div>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        {pana.length > 0 && !viewMore ? (
          <h2 className="popup-heading-3 text-start d-flex align-items-center justify-content-start">
            {pana[0].name}
            <a
              href={pana[0]}
              download={pana[0].name}
              style={{ marginLeft: "10px" }}
            >
              <img src={download} alt="download-icon" className="small-icon" />
            </a>
            <span style={{ marginLeft: "10px" }} onClick={() => delPana(0)}>
              <img src={del} alt="delete-icon" className="small-icon" />
            </span>
          </h2>
        ) : pana.length > 1 && viewMore ? (
          pana.map((file, index) => (
            <h2
              key={index}
              className="popup-heading-3 text-start d-flex align-items-center justify-content-start"
            >
              {file.name}
              <a
                href={file}
                download={file.name}
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
                onClick={() => delPana(index)}
              >
                <img src={del} alt="delete-icon" className="small-icon" />
              </span>
            </h2>
          ))
        ) : (
          ""
        )}
      </div>
      <div className="row justify-content-start" style={{ width: "100%" }}>
        <div className="col-12 col-lg-6 text-start d-flex justify-content-center justify-content-md-start">
          <label className={`andent-button-sm`}>
            <h2 className="button-text">Panoramex</h2>
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
            <button type="button" style={{ display: "none" }}></button>
          </label>
        </div>
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
            className="andent-button"
            onClick={handleClientCreate}
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
      </div>
    </>
  );
}

export default EditClient;
