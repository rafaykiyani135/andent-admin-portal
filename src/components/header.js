import logo from '../assets/data/logo.png'
import logout from '../assets/data/logout.png'
import save from '../assets/data/save.png'
import { useState,useEffect } from 'react';
import arrow from '../assets/data/arrow.png'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import passicon from '../assets/data/password.png'

function Header(){
    
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSettingOpen,setIsSettingOpen] = useState(false)
   // const [path,setPath] = useState("")
    const menuRef=useRef();
    const menuRef2=useRef();

    useEffect(()=>{
        let handler = (e)  =>{
            if(!menuRef2.current.contains(e.target)){
                setIsSettingOpen(false)
            }
        }

        document.addEventListener("mousedown",handler);

        return()=>{
            document.removeEventListener("mousedown",handler)
        }
    },[setIsSettingOpen])

    // useEffect(()=>{
    //     setPath(window.location.pathname);
    // },[])

    useEffect(()=>{
        let handler = (e)  =>{
            if(!menuRef.current.contains(e.target)){
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown",handler);

        return()=>{
            document.removeEventListener("mousedown",handler)
        }
    },[])

    useEffect(() => {
        function handleWindowSizeChange() {
        setIsMobile(window.innerWidth < 600); // Define the width to consider as mobile
        }

        // Initial check on component mount
        handleWindowSizeChange();

        // Event listener for window resize
        window.addEventListener('resize', handleWindowSizeChange);

        // Cleanup the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);
  
    return(
        <div>
            <div className="row login-top justify-content-start" style={{width: isMobile? "117%":"100%"}}>
                <div className="col-5 col-lg-5">
                    <img src={logo} alt="andent logo" className="andent-logo"/>
                </div>
                <div className="col-lg-2 text-start d-none d-md-block no-cont-offset3 text-center text-md-start" style={{width:"auto"}}>
                    <h1 className="login-top-text">
                        Andent Portal
                    </h1>
                </div>
                <div className='col-6 col-lg-3 d-flex justify-content-end align-items-center header-user'>
                       {//logged in user/employee should be shown here
                       //implement logic when api is integrated
                       }
                       <Link style={{position:"absolute",marginTop:"12px"}}>
                       <ul onClick={()=>{setIsOpen(!isOpen)}} className='header-user-textbox' ref={menuRef} style={{listStyleType:"none"}}>
                        <li className='text-center'>
                        Gestri Hali (Admin) <span><img src={arrow} className='small-icon' alt='arrow icon' />
                        </span>
                        </li>
                        <div className={`dropdown-content ${isOpen ? 'open' : ''} justify-content-end`} >
                            <p onClick={()=>{setIsSettingOpen(true)}}>Settings</p>
                            <Link to='/' style={{marginTop:"-10px",textDecoration:"none",color:"#4B5768"}}>Logout<span>
                                <img src={logout} alt='logout icon' className='small-icon' style={{position:"absolute",right:"12px"}}/>
                            </span></Link>
                        </div>
                       </ul>
                       </Link>
                       <div className={`${isOpen? 'dropdown-overlay' : ''}`}>
                        {//Dropdown opacity logic
                        }
                       </div>
                       <div className={`${isSettingOpen? 'setting-popup' : 'd-none'}`} ref={menuRef2}>
                       <div className='row justify-content-center text-center'>
                            <div className='col-lg-12 col-12'>
                                <h2 className='popup-heading'>
                                    User
                                </h2>
                            </div>
                        </div>
                        <div className='row justify-content-start' style={{width:'100%'}}>
                            <div className='col-12 col-lg-12 text-start'>
                                <h2 className='popup-heading-2 text-start'>
                                   Username
                                </h2>
                            </div>
                            <div className='col-lg-12 col-12 text-start'>
                                <input className='popup-inputs' placeholder='Enter username'/>
                            </div>
                        </div>
                        <div className='row justify-content-start' style={{width:'100%'}}>
                            <div className='col-12 col-lg-12 text-start'>
                                <h2 className='popup-heading-2 text-start'>
                                    Old Password
                                </h2>
                            </div>
                            <div className='col-lg-12 col-12 text-start'>
                                <input className='popup-inputs' placeholder='Enter Password'/>
                            </div>
                        </div>
                        <img src={passicon} alt='password-icon' className='small-icon' style={{position:"absolute",bottom:"55%",left:"91%"}}/>
                        <div className='row justify-content-start' style={{width:'100%'}}>
                            <div className='col-12 col-lg-12 text-start'>
                                <h2 className='popup-heading-2 text-start'>
                                    New Password
                                </h2>
                            </div>
                            <div className='col-lg-12 col-12 text-start'>
                                <input className='popup-inputs' placeholder='Enter Password'/>
                            </div>
                        </div>
                        <img src={passicon} alt='password-icon' className='small-icon' style={{position:"absolute",bottom:"38.7%",left:"91%"}}/>
                        <div className='row justify-content-start' style={{width:'100%'}}>
                            <div className='col-12 col-lg-12 text-start'>
                                <h2 className='popup-heading-2 text-start'>
                                    Confirm Password
                                </h2>
                            </div>
                            <div className='col-lg-12 col-12 text-start'>
                                <input className='popup-inputs' placeholder='Re-Enter Password'/>
                            </div>
                        </div>
                        <img src={passicon} alt='password-icon' className='small-icon' style={{position:"absolute",bottom:"21.9%",left:"91%"}}/>
                        <div className='row justify-content-center' style={{width:'100%'}}>
                            <div className='col-12 col-lg-12 text-start d-flex justify-content-center align-items-center'>
                            <button className='andent-button' onClick={()=>{setIsSettingOpen(false)}}>
                            <h2 className='button-text'>
                                        Save Changes
                            </h2>
                            <span className='d-flex align-items-center'>
                                <img src={save} alt='genlink icon' className='small-icon'/>
                            </span>
                            </button>
                            </div>
                        </div>
                       </div>
                </div>
            </div>
        </div>
    )
}

export default Header;