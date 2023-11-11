import { useState } from "react";
import generate from '../../assets/data/generate.png'
import dgenerate from '../../assets/data/darkgenerate.png'
import arrow from '../../assets/data/arrow.png'
import { Link } from "react-router-dom";

function MagicLink({sendDataToParent}){

    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [isOpen,setIsOpen] = useState(false)

    const handleLanguageChange = (event) => {
        const linkText = event.target.textContent;
        setSelectedLanguage(linkText);
    };

    const handleSendData = () => {
        sendDataToParent(selectedLanguage);
        const lang=selectedLanguage;
        if(lang==="Italian link"){
            navigator.clipboard.writeText("https://andent.al/it/contattaci")
        }
        else if(lang==="English link"){
            navigator.clipboard.writeText("https://andent.al/contact-us")
        }
        else{
            navigator.clipboard.writeText("https://andent.al/sq/kontakt")
        }
    };

    return(
        <>
            <div className='row justify-content-center text-center'>
                <div className='col-lg-12 col-12'>
                    <h2 className='popup-heading'>
                        Generate Magic Link
                    </h2>
                </div>
            </div>
            <div className='row justify-content-start align-items-center ' style={{width:'100%'}}>
                <div className='col-12 col-lg-12 text-start'>
                    <h2 className='popup-heading-2 text-start'>
                        Language
                    </h2>
                </div>
                <div className='col-lg-8 col-8 text-start'>
                <div
                    className='popup-inputs-3'
                >
                    <h2 className="magiclink-btn-text" style={{width:"100%"}} onClick={()=>{setIsOpen(!isOpen)}}>
                        <Link style={{textDecoration:"none",color:"#B8C0CC"}} >
                        {selectedLanguage? selectedLanguage : "Choose Language" }  <span style={{position:"fixed",bottom:"42px",left:"250px"}}>
                                <img src={arrow} alt="arrow-icon" className="small-icon"/>
                        </span>
                        </Link>
                        <div className={`dropdown-content ${isOpen ? 'open' : ''} justify-content-end`} style={{gap:"4px"}}>
                            <Link style={{marginTop:"-10px",textDecoration:"none",color:"#4B5768"}}  onClick={handleLanguageChange}>English link<span>
                                <img src={dgenerate} alt='logout icon' className='small-icon' style={{position:"absolute",right:"12px"}}/>
                            </span></Link>
                            <Link style={{textDecoration:"none",color:"#4B5768"}} onClick={handleLanguageChange}>Albanian link<span>
                                <img src={dgenerate} alt='logout icon' className='small-icon' style={{position:"absolute",right:"12px"}}/>
                            </span></Link>
                            <Link style={{textDecoration:"none",color:"#4B5768"}} onClick={handleLanguageChange}>Italian link<span>
                                <img src={dgenerate} alt='logout icon' className='small-icon' style={{position:"absolute",right:"12px"}}/>
                            </span></Link>
                        </div>
                    </h2>
                </div>
                </div>
                <div className='col-lg-4 col-4 text-start d-flex align-items-center justify-content-end'>
                <button className='andent-button-2' onClick={handleSendData} disabled={!selectedLanguage}>
                    <img src={generate} alt='genlink icon' className='small-icon'/><span>
                        <h2 className="button-text">
                            Generate
                        </h2>
                    </span>
                </button>
                </div>
            </div>
        </>
    )
}

export default MagicLink;