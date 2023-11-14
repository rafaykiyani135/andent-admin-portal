import upload from '../../assets/data/upload.png'
import download from '../../assets/data/download.png'
import del from '../../assets/data/delete.png'
import add from '../../assets/data/add.png'
import { useState } from 'react';
import mail from '../../assets/data/mailicon.png'
import phone from '../../assets/data/phone.png'

function NewClient(){

    const countries = ["Country","Italy","Albania","United Kingdom", "USA", "Canada", "UK", "Australia", "Germany"];
    const statuses = ["Choose Status","Contacted","Invoice Sent","Booked","Procedure Done","Contact Again"]
    const [viewMore,setViewMore] = useState(false);
    const [invoice,setInvoice] = useState(null)
    const [pana,setPana] = useState([]);
    const [invoiceName,setInvoiceName] = useState("")
    const [receipt,setReceipt] = useState(null)
    const [receiptName,setReceiptName] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("Country");
    const [clStatus, setclStatus] = useState("Choose Status");

    const handlePanoChange = (event) => {
        const newFiles = event.target.files;
        const newFilesArray = Array.from(newFiles);
        setPana((prevPana) => [...prevPana, ...newFilesArray]);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleStatusChange = (event) => {
        setclStatus(event.target.value);
    };

    const handleFileChange = (e) =>{
        setInvoice(e.target.files[0]);
        setInvoiceName(e.target.files[0].name);
      }
    
      const handleReceiptChange = (e) =>{
        setReceipt(e.target.files[0]);
        setReceiptName(e.target.files[0].name);
      }
    
      const delInvoice = () =>{
            setInvoice(null);
            setInvoiceName("")
      }

      const delReceipt = () =>{
        setReceipt(null);
        setReceiptName("")
      }

      const delPana = (index) => {
        if(pana.length===2){
            setViewMore(false);
        }
        setPana((prevPana) => {
            const updatedPana = [...prevPana];
            updatedPana.splice(index, 1); // Remove the file at the specified index
            return updatedPana;
          });
      };

    return(
        <>
        <div className='row justify-content-center text-center'>
        <div className='col-lg-12 col-12'>
            <h2 className='popup-heading'>
                Client Name
            </h2>
        </div>
        </div>
        <div className='row justify-content-start' style={{width:'100%'}}>
            <div className='col-12 col-md-6 text-start'>
                <div>
                <h2 className='popup-heading-2 text-start'>
                    First Name
                </h2>
                <input className='popup-inputs-small' placeholder='Enter First Name'/>
                </div>
                <div style={{marginTop:"8px"}}>
                <h2 className='popup-heading-2 text-start'>
                    Email
                </h2>
                <input className='popup-inputs-small' placeholder='Enter email'/>
                <img src={mail} alt='mail-icon' className='small-icon client-mail-icon'/>
                </div>
                <div style={{ marginTop: "8px" }}>
                <h2 className='popup-heading-2 text-start'>
                    Country
                </h2>
                <select value={selectedCountry} onChange={handleCountryChange} className='popup-inputs-small-dropdown'>
                    {countries.map((country, index) => (
                    <option key={index} value={country} disabled={index === 0}>
                        {country}
                    </option>
                    ))}
                </select>
                </div>
            </div>
            <div className='col-md-6 col-12 text-start mob-top-pad'>
                <div>
                <h2 className='popup-heading-2 text-start'>
                    Last Name
                </h2>
                <input className='popup-inputs-small' placeholder='Enter Last Name'/>
                </div>
                <div style={{marginTop:"8px"}}>
                <h2 className='popup-heading-2 text-start'>
                    Number
                </h2>
                <input className='popup-inputs-small' placeholder='Enter number'/>
                <img src={phone} alt='mail-icon' className='small-icon client-mail-icon'/>
                </div>
            </div>
            <div className='row justify-content-center text-center' style={{marginTop:"12px"}}>
            <div className='col-lg-6 col-12 d-flex justify-content-start'>
            {invoice? (
                    <h2 className='popup-heading-3 text-start d-flex align-items-center'>
                        {invoiceName}<a  href={invoice} download={invoiceName} style={{marginLeft:"10px"}}>
                            <img src={download} alt='download-icon' className='small-icon'/>
                        </a>
                        <span style={{marginLeft:"10px"}} onClick={delInvoice}>
                            <img src={del} alt='delete-icon' className='small-icon'/>
                        </span>
                    </h2>
            ) : ("")}
            </div>
            <div className='col-lg-6 col-12 d-flex justify-content-start justify-content-md-center'>
            {receipt? (
                    <h2 className='popup-heading-3 text-start d-flex align-items-center justify-content-center'>
                        {receiptName}<a  href={receipt} download={receiptName} style={{marginLeft:"10px"}}>
                            <img src={download} alt='download-icon' className='small-icon'/>
                        </a>
                        <span style={{marginLeft:"10px"}} onClick={delReceipt}>
                            <img src={del} alt='delete-icon' className='small-icon'/>
                        </span>
                    </h2>
            ) : ("")}
            </div>
            </div>
            <div className='row justify-content-center text-center' style={{marginTop:"12px"}}>
            <div className='col-lg-6 col-6 d-flex justify-content-start'>

            <label className={`andent-button ${invoice? `button-disabled` : ``}`}>
                <h2 className='button-text'>
                    Upload Invoice
                </h2>
                <span className='d-flex align-items-center'>
                    <img src={upload} alt='upload-icon' className='small-icon' />
                </span>
                <input
                    onChange={handleFileChange}
                    type="file"
                    style={{ display: 'none' }}
                />
                {/* Button triggers file input click */}
                <button type="button" style={{ display: 'none' }}></button>
            </label>

            </div>
            <div className='col-lg-6 col-6 d-flex justify-content-center'>
            <label className={`andent-button ${receipt? `button-disabled` : ``}`}>
                <h2 className='button-text'>
                    Upload Receipt
                </h2>
                <span className='d-flex align-items-center'>
                    <img src={upload} alt='upload-icon' className='small-icon' />
                </span>
                <input
                    onChange={handleReceiptChange}
                    type="file"
                    style={{ display: 'none' }}
                />
                {/* Button triggers file input click */}
                <button type="button" style={{ display: 'none' }}></button>
            </label>
            </div>
            </div>
        </div>
        <div className='row justify-content-start' style={{width:"100%"}}>
                <div className='col-12 col-lg-12'>
                    <h2 className='popup-heading-2 text-start'>
                        Client Status
                    </h2>
                </div>
                <div className='col-12 col-lg-6'>
                    <select onChange={handleStatusChange} value={clStatus} className='popup-inputs-small-dropdown'>
                            {statuses.map((stat, index) => (
                            <option key={index} value={stat} disabled={index === 0}>
                                {stat}
                            </option>
                            ))}
                    </select>
                </div>
        </div>
        <div className='row justify-content-start' style={{width:'100%'}}>
            <div className='col-12 col-lg-12 text-start'>
                <h2 className='popup-heading-2 text-start'>
                    Client Notes
                </h2>
            </div>
            <div className='col-lg-12 col-12 text-start'>
                <textarea type='' className='popup-inputs-4' placeholder='Enter Text' style={{resize:"none"}}></textarea>
            </div>
        </div>
        <div className='row justify-content-start' style={{width:'100%'}}>
            <div className='col-12 col-lg-12 text-start'>
                <h2 className='popup-heading-2 text-start' style={{fontSize:"14px"}}>
                Upload Panoramex (Jpg, Png, Pdf)
                </h2>
            </div>
        </div>
        <div className='row justify-content-start' style={{width:"100%"}}>
        {pana.length>0 && !viewMore? (
                <h2 className='popup-heading-3 text-start d-flex align-items-center justify-content-start'>
                {pana[0].name}<a href={pana[0]} download={pana[0].name} style={{marginLeft:"10px"}}>
                    <img src={download} alt='download-icon' className='small-icon'/>
                </a>
                <span style={{marginLeft:"10px"}} onClick={() => delPana(0)}>
                    <img src={del} alt='delete-icon' className='small-icon'/>
                </span>
            </h2>
            ) : pana.length>1 && viewMore? (pana.map((file, index) => (
                <h2 key={index} className='popup-heading-3 text-start d-flex align-items-center justify-content-start'>
                        {file.name}<a  href={file} download={file.name} style={{marginLeft:"10px"}}>
                            <img src={download} alt='download-icon' className='small-icon'/>
                        </a>
                        <span style={{marginLeft:"10px"}} onClick={() => delPana(index)}>
                            <img src={del} alt='delete-icon' className='small-icon'/>
                        </span>
                </h2>
            ))) : ""}
        </div>
        <div className='row justify-content-start' style={{width:"100%"}}>
            <div className='col-12 col-lg-6 text-start d-flex justify-content-center justify-content-md-start'>
            <label className={`andent-button-sm`}>
                <h2 className='button-text'>
                Panoramex
                </h2>
                <span className='d-flex align-items-center'>
                    <img src={upload} alt='upload-icon' className='small-icon' />
                </span>
                <input
                    onChange={handlePanoChange}
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                />
                {/* Button triggers file input click */}
                <button type="button" style={{ display: 'none' }}></button>
            </label>
            </div>
            {pana.length > 1? (<div className='col-6 col-lg-6 text-start d-flex justify-content-end align-items-center'>
                <u onClick={()=>{setViewMore(!viewMore)}}>
                <h2 className='popup-heading-2'>
                    {viewMore? 'View Less Uploads' : 'View More Uploads'}
                </h2>
                </u>
            </div>) : ("")}
        </div>
        <div className='row justify-content-start d-flex' style={{width:'100%'}}>
                <div className='col-12 col-lg-12 text-start d-flex justify-content-center' style={{gap:"24px"}}>
                <button className='andent-button'>
                    <h2 className='button-text'>
                            Add Client<span style={{marginLeft:"8px",bottom:"2px",position:"relative"}}>
                    <img src={add} alt='genlink icon' className='small-icon'/>
                    </span>
                    </h2>
                </button>
                </div>
        </div>
        </>
    )
}

export default NewClient;