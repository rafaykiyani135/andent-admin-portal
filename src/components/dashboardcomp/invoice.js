import download from '../../assets/data/download.png'
import del from '../../assets/data/delete.png'
import upload from '../../assets/data/upload.png'
import invwhite from '../../assets/data/invoicewhite.png'
import mailicon from '../../assets/data/mailicon.png'
import excl from '../../assets/data/exclamation.png'
import { useState } from 'react'

function Invoice(props){

    const [file,setFile] = useState(null)
    const [fileName,setFileName] = useState("")
    const [desc,setDesc] = useState("Dear sir/maam,\n\nKindly review the attached invoice and let us know if you have any queries.\n\nBest Regards,\nAndent Clinic.")

    const handleFileChange = (e) => {
        // Handle file change logic
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    };

    const delImage = (e) => {
        // Handle file change logic
        setFile(null);
        setFileName("")
    };

    return(
        <>
             <div className='row justify-content-center text-center'>
                <div className='col-lg-12 col-12'>
                    <h2 className='popup-heading'>
                        Send Invoice
                    </h2>
                </div>
            </div>
            <div className='row justify-content-start' style={{width:'100%'}}>
                <div className='col-12 col-lg-12 text-start'>
                    <h2 className='popup-heading-2 text-start'>
                        Client Email
                    </h2>
                </div>
                <div className='col-lg-12 col-12 text-start'>
                    <div className='d-flex align-items-center'>
                    <input className='popup-inputs' readOnly={true} placeholder={props.mail} />
                    <img src={mailicon} alt='mail-icon' className="small-icon" style={{position:"absolute",right:"40px"}}/>
                    </div>
                </div>
            </div>
            <div className='row justify-content-start' style={{width:'100%'}}>
                <div className='col-12 col-lg-12 text-start'>
                    <h2 className='popup-heading-2 text-start'>
                        Subject
                    </h2>
                </div>
                <div className='col-lg-12 col-12 text-start'>
                    <div className='popup-inputs popup-heading-2 d-flex align-items-center invoice-sub-height'>
                        Andent Invoice for your dental procedure 
                        <img src={excl} alt='mail-icon' className="small-icon" style={{position:"absolute",right:"40px"}}/>
                    </div>
                </div>
            </div>
            <div className='row justify-content-start' style={{width:'100%'}}>
                <div className='col-12 col-lg-12 text-start'>
                    <h2 className='popup-heading-2 text-start'>
                        Description
                    </h2>
                </div>
                <div className='col-lg-12 col-12 text-start'>
                    <textarea type='' className='popup-inputs-2' value={desc} onChange={(e) => {setDesc(e.target.value)}} style={{resize:"none",fontSize:"14px"}}></textarea>
                </div>
            </div>
            {file? (<div className='row justify-content-start' style={{width:'100%'}}>
                <div className='col-12 col-lg-12 text-start'>
                    <h2 className='popup-heading-3 text-start d-flex align-items-center'>
                        {fileName}<a  href={file} download={fileName} style={{marginLeft:"10px"}}>
                            <img src={download} alt='download-icon' className='small-icon'/>
                        </a>
                        <span style={{marginLeft:"10px"}} onClick={delImage}>
                            <img src={del} alt='delete-icon' className='small-icon'/>
                        </span>
                    </h2>
                </div>
            </div>) : ("")}
            <div className='row justify-content-start d-flex' style={{width:'100%'}}>
                <div className='col-12 col-lg-12 text-start d-flex justify-content-center' style={{gap:"24px"}}>

                <label className={`andent-button ${file? `button-disabled` : ``}`}>
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

                <button className='andent-button'>
                <h2 className='button-text'>
                            Send Invoice
                </h2>
                <span className='d-flex align-items-center'>
                    <img src={invwhite} alt='genlink icon' className='small-icon'/>
                </span>
                </button>
                </div>
            </div>
            </>
    )
}

export default Invoice;