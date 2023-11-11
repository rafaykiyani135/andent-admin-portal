import logo from '../../assets/data/logo.png'
import mail from '../../assets/data/mailicon.png'
import phone from '../../assets/data/phone.png'
import upload from '../../assets/data/upload.png'
import { useState } from 'react'
import download from '../../assets/data/download.png'
import del from '../../assets/data/delete.png'
import send from '../../assets/data/invoicewhite.png'
import happy from '../../assets/data/happy.png'

function BookApt(){

    const [pana,setPana] = useState([]);
    const [submitted,setSubmitted] = useState(false);

    const handlePanoChange = (event) => {
        const newFiles = event.target.files;
        const newFilesArray = Array.from(newFiles);
        setPana((prevPana) => [...prevPana, ...newFilesArray]);
    };

    const delPana = (index) => {
        setPana((prevPana) => {
            const updatedPana = [...prevPana];
            updatedPana.splice(index, 1); // Remove the file at the specified index
            return updatedPana;
          });
    };

    return(
        <>
            <div className="container appointment-ctr">
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col-lg-12 col-12">
                        <h2>
                            Book An Appointment
                        </h2>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col-lg-12 col-12">
                        <img src={logo} alt='andent-logo' className='apt-logo'/>
                    </div>
                </div>
                <div className='form'>
                <div className='row justify-content-start' style={{width:'100%'}}>
                <div className='col-12 col-md-6 text-start'>
                    <div>
                    <h2 className='popup-heading-2 text-start'>
                        First Name
                    </h2>
                    <input className='book-input' placeholder='Enter First Name'/>
                    </div>
                    <div style={{marginTop:"8px"}}>
                    <h2 className='popup-heading-2 text-start'>
                        Email
                    </h2>
                    <div className=''>
                    <input className='book-input' placeholder='Enter email'/>
                    <img src={mail} alt='mail-icon' className='small-icon book-mail-icon'/>
                    </div>
                    </div>
                </div>
                <div className='col-md-6 col-12 text-start book-apt-pos'>
                    <div>
                    <h2 className='popup-heading-2 text-start'>
                        Last Name
                    </h2>
                    <input className='book-input' placeholder='Enter Last Name'/>
                    </div>
                    <div style={{marginTop:"8px"}}>
                    <h2 className='popup-heading-2 text-start'>
                        Number
                    </h2>
                    <div className=''>
                    <input className='book-input' placeholder='Enter number'/>
                    <img src={phone} alt='mail-icon' className='small-icon book-mail-icon'/>
                    </div>
                    </div>
                </div>

                <div className='row justify-content-start' style={{width:'100%',marginTop:"8px"}}>
                    <div className='col-12 col-lg-12 text-start'>
                        <h2 className='popup-heading-2 text-start'>
                            Message
                        </h2>
                    </div>
                    <div className='col-lg-12 col-12 text-start'>
                        <textarea type='' className='popup-inputs-5' placeholder='Enter Text' style={{resize:"none"}}></textarea>
                    </div>
                </div>

                <div className='row justify-content-start' style={{width:"100%",marginTop:`${pana.length===0? `0px` : `12px`}`}}>
                {pana? (pana.map((file, index) => (
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
                <div className='row justify-content-start justify-content-md-start upload-pano-mob' style={{width:"100%",marginTop:"12px"}}>
                    <div className='col-6 col-lg-6 text-start uploadpano'>
                    <label className={`andent-button-long`}>
                        <h2 className='button-text'>
                        Upload Panoramex
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
                </div>

                <div className=' justify-content-center align-items-center text-center text-md-start' style={{width:"100%",marginTop:"12px"}}>
                    <div className='col-lg-12 col-12'>
                        <p className='policy'>
                        By submitting this form you agree to our <span>privacy policy</span> as well as to receive
                        marketing emails from Andent. You can unsubscribe from these communications at
                        any time.
                        </p>
                    </div>
                </div>

                <div className='row justify-content-start d-flex upload-pano-mob' style={{width:'100%'}}>
                    <div className='col-12 col-lg-12 text-start d-flex justify-content-center submitform' style={{gap:"24px"}}>
                    <button className='andent-button-long' onClick={()=>{setSubmitted(true)}}>
                        <h2 className='button-text'>
                                Submit Form<span style={{marginLeft:"8px",bottom:"2px",position:"relative"}}>
                        <img src={send} alt='genlink icon' className='small-icon'/>
                        </span>
                        </h2>
                    </button>
                    </div>
                </div>
            </div>
            </div>
            </div>
            <div className={`${submitted? `form-submitted` : `d-none`}`} onClick={()=>{setSubmitted(false)}}>
                <div className='row justify-content-center text-center'>
                    <div className='col-lg-12 col-12'>
                        <img src={happy} alt='success-icon' style={{width:"32px",height:"32px"}} />
                    </div>
                </div>
                <div className='row justify-content-center text-center'>
                    <div className='col-lg-12 col-12'>
                        <h2 className='popup-heading-2'>
                        Your form has been submitted successfully. We will be contacting you soon!<br/>
                        Thank you! 
                        </h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookApt;