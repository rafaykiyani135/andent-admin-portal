import success from '../../assets/data/success.png'
import dgenerate from '../../assets/data/darkgenerate.png'
import { useEffect,useState } from 'react';

function GLink(props){

    const [link,setLink] = useState(null)

    useEffect(()=>{
        const lang=props.language;
        if(lang==="Italian link"){
            setLink("https://andent.al/it/contattaci")
            navigator.clipboard.writeText("https://andent.al/it/contattaci")
        }
        else if(lang==="English link"){
            setLink("https://andent.al/contact-us")
            navigator.clipboard.writeText("https://andent.al/contact-us")
        }
        else{
            setLink("https://andent.al/sq/kontakt")
            navigator.clipboard.writeText("https://andent.al/sq/kontakt")
        }
    },[props.language])

    return(
        <>
            <div className='row justify-content-center text-center'>
                <div className='col-lg-12 col-12'>
                    <img src={success} alt='success-icon' className='small-icon' />
                </div>
            </div>
            <div className='row justify-content-center text-center'>
                <div className='col-lg-12 col-12'>
                    <h2 className='popup-heading-2' style={{width:"401px"}}>
                        Link has been generated successfully and has been copied to clipboard. 
                    </h2>
                </div>
            </div>
            <div className='row text-center'>
                <div className='col-lg-12 col-12'>
                    <div className='link-generated'>
                        <h2 className='popup-heading-2 d-flex justify-content-start align-items-center' style={{width:"401px",marginTop:"3.5px"}}>
                            {link} <span style={{position:"fixed",left:"76%",top:"65%"}}>
                                <img src={dgenerate} alt='dark-generate-icon' className='small-icon'/>
                            </span>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GLink;