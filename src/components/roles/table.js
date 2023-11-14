import edit from '../../assets/data/editperm.png'
import EditRole from './editrole';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect,useRef } from 'react';

function RolesTable(){


    const [editRole,setEditRole] = useState(false);
    const [chRole,setChRole] = useState("");
    const menuRef=useRef();

    useEffect(()=>{
        let handler = (e)  =>{
            if(!menuRef.current.contains(e.target)){
                setEditRole(false);
            }
        }

        document.addEventListener("mousedown",handler);

        return()=>{
            document.removeEventListener("mousedown",handler)
        }
    },[])


    let tableData = [
        { id: 1, userRole: 'Partner', editPerm: 'Edit Perm'},
        { id: 2, userRole: 'Admin', editPerm: 'Edit Perm'},
    ];
    
    const handleClick = (data) =>{
        setEditRole(true)
        setChRole(data);
    }

    return(
        <div className="table-container" style={{width:"100% !important",marginLeft:"-4px"}} >
            <table className='andent-table'>
            <thead>
                <tr>
                <th scope="col" className=" box-size-4" style={{borderRadius:"4px 0px 0px 0px"}}>Sr. No</th>
                <th scope="col" className=" box-size-4">Roles</th>
                <th scope="col" className=" box-size-4" style={{borderRadius:"0px 4px 0px 0px"}}>Edit Permission</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, index) => (
                <tr key={row.id}>
                    <td className="box-size-4">{index + 1}</td>
                    <td className="box-size-4">{row.userRole}</td>
                    <Link onClick={()=>{handleClick(row.userRole)}}>
                    <td className="box-size-4">
                        <img src={edit} alt='edit-icon' className='small-icon' />
                    </td>
                    </Link>
                </tr>
                ))}
            </tbody>
            </table>
            <div className={`${editRole? `addrole` : `d-none`}`} ref={menuRef}>
                <EditRole role={chRole}/>
            </div>
        </div>
    )
}

export default RolesTable;