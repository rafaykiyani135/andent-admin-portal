import React, { useEffect, useState } from 'react';
import icon1 from '../../assets/data/loginaccs.png'
import icon2 from '../../assets/data/allclients.png'
import icon3 from '../../assets/data/roles.png'
import icon1active from '../../assets/data/loginaccsactive.png'
import icon2active from '../../assets/data/allclientsactive.png'
import icon3active from '../../assets/data/rolesactive.png'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Sidebar() {
  
  const location=useLocation();
  const [path,setPath]=useState(location.pathname)

  useEffect(()=>{
    setPath(location.pathname)
  },[setPath,location])

  return (
    <div className='sidebar d-none d-md-block'>
      <ul className='sidebar-ul'>
        <li className='siderbar-li d-flex align-items-center'>
            <NavLink to='/accounts' style={{ textDecoration: 'none'}} className='d-flex justify-content-center align-items-center'>
            <img src={path==="/accounts"? icon1active : icon1} alt='logged in accounts' className='small-icon'/><span>
                <h2 className='sidebar-text' style={{width:"150px"}}>Login Accounts</h2>
            </span>
            </NavLink>
        </li>
        <li className='siderbar-li d-flex align-items-center'>
            <NavLink to='/clients' style={{ textDecoration: 'none'}} className='d-flex justify-content-center align-items-center'>
            <img src={path==="/clients"? icon2active : icon2} alt='all clients' className='small-icon'/><span>
                <h2 className='sidebar-text' style={{marginTop:"6px"}}>All Client</h2>
            </span>
            </NavLink>
        </li>
        <li className='siderbar-li d-flex align-items-center'>
            <NavLink to='/roles' style={{ textDecoration: 'none'}} className='d-flex justify-content-center align-items-center'>
            <img src={path==="/roles"? icon3active : icon3} alt='roles' className='small-icon'/><span>
                <h2 className='sidebar-text'>Roles</h2>
            </span>
            </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;