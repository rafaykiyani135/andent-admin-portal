import { useState } from 'react';
import add from '../../assets/data/add.png'
import RolesTable from './table';
import AddRole from './addrole';
import { useRef,useEffect } from 'react';

function RolesContent(){

    const [addRole,setAddRole] = useState(false);
    const menuRef=useRef();

    useEffect(()=>{
        let handler = (e)  =>{
            if(!menuRef.current.contains(e.target)){
                setAddRole(false);
            }
        }

        document.addEventListener("mousedown",handler);

        return()=>{
            document.removeEventListener("mousedown",handler)
        }
    },[])

    return(
        <div className='d-flex justify-content-center cl-table-pos'>
        <div className="roles-content">
            <div className='row justify-content-start align-items-center'>
            <div className='col-lg-5 col-md-12 col-12 d-flex justify-content-center justify-content-md-start'>
                <button className='andent-button-long' onClick={()=>{setAddRole(true)}}>
                    <h2 className='large-button-txt'>
                        Add New Role
                    </h2>
                    <span className='d-flex align-items-center'>
                        <img src={add} alt='genlink icon' className='small-icon'/>
                    </span>
                </button>
            </div>
            <div className='col-lg-5 col-md-12 col-12 d-flex align-items-center justify-content-center justify-content-md-start largetext-pos'>
                <h2 className='accounts-top-text'>
                    Roles
                </h2>
            </div>
            </div>
            <div style={{width:"100%"}}>
                <RolesTable/>
            </div>
            <div className={`${addRole? `addrole` : `d-none`}`} ref={menuRef}>
                <AddRole/>
            </div>
        </div>
        </div>
    )
}

export default RolesContent;