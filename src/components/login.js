import usericon from '../assets/data/user-ico.png'
import passicon from '../assets/data/pass-ico.png'
import React, { useState,useEffect } from 'react';
import Header from './header'
import { Link } from 'react-router-dom';

function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleWindowSizeChange() {
        setIsMobile(window.innerWidth < 1400); // Define the width to consider as mobile
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
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleLogin = () => {
      console.log('Username:', username);
      console.log('Password:', password);
      // Implement validation logic
    };

    return(
        <div>
            <Header/>
            <div className="container login-top-pad">
                <div className="row login-body justify-content-center" style={{width:"100%"}}>
                    <div className="col-12 col-lg-6 col-md-6 text-center">
                        <div className="login-form no-cont-offset-2">
                            <h2 className="small-heading">
                                Enter Login Credentials 
                            </h2>
                            <form className='login-form' style={{paddingTop:"80px"}}>
                            <div>
                            <input
                                required
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className={`login-input ${isMobile ? 'col-12' : ''}`}
                                placeholder="Enter Username"
                            />
                            <img src={usericon} alt='user-icon' className='login-icons'/>
                            </div>
                            <div>
                            <input
                                required
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`login-input ${isMobile ? 'col-12' : ''}`}
                                placeholder="Enter Password"
                            />
                            <img src={passicon} alt='pass-icon' className='login-icons'/>
                            </div>
                            <Link to='/clients' style={{textDecoration:"none"}}>
                            <button type="submit" className='login-button login-text' onClick={handleLogin}>Log In</button>
                            </Link>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;