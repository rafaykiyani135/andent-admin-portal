import { useState } from "react";
import plus from '../../assets/data/add.png'

function AddRole(){

    const [permissions, setPermissions] = useState({
        User: { Create: false, Read: false, Update: false, Delete: false },
        Roles: { Create: false, Read: false, Update: false, Delete: false },
        Client: { Create: false, Read: false, Update: false, Delete: false },
        Invoice: { Create: false, Read: false, Update: false, Download: false },
        MagicLink: { Create: false, eng: false, al: false, it: false },
      });
    
      const handlePermissionChange = (category, action) => {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          [category]: {
            ...prevPermissions[category],
            [action]: !prevPermissions[category][action],
          },
        }));
    };

    return(
        <>
            <div className="row justify-content-center text-start" style={{width:"100%"}}>
                <div className="col-lg-6 col-12 text-start">
                    <h2 className='popup-heading-2 text-center text-md-start'>
                        Role Name
                    </h2>
                </div>
            </div>
            <div className="row justify-content-center text-start" style={{width:"100%"}}>
                <div className="col-lg-6 col-12 text-start">
                    <div>
                    <input className='popup-inputs-small' placeholder='Enter Role Name'/>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center text-center" style={{width:"100%",marginTop:"10px"}}>
                <div className="col-lg-12 col-12 text-center">
                    <h2 className='popup-heading-4'>
                        Permisions / Admin
                    </h2>
                </div>
            </div>
            <div className="perm-table-mob" style={{width:"100%"}}>
            <div className="perm-table">
            <table>
            <thead>
                <tr>
                <th className="namefield">Name Fields</th>
                <th colSpan={4} style={{textAlign:"center"}} className="selectperm">Select Permissions</th>
                </tr>
            </thead>
            <tbody >
                {Object.keys(permissions).map((category) => (
                <tr key={category}>
                    <td className="categories-box permission-text-2">{category === "MagicLink" ? "Magic Link" : category}</td>
                    {Object.keys(permissions[category]).map((action) => (
                    <td key={action} className="perm-box">
                        <div className="d-flex align-items-center justify-content-around text-start" >
                        <p className="permission-text">{action==="eng"? "ENG link" : action==="it"? "IT link" : action==="al"? "AL link" : action}</p>
                        <span>
                            <input
                            type="checkbox"
                            checked={permissions[category][action]}
                            onChange={() => handlePermissionChange(category, action)}
                            />
                        </span>
                        </div>
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
            </div>
            </div>

            <div className='row justify-content-start d-flex' style={{width:'100%',marginTop:"12px"}}>
                <div className='col-12 col-lg-12 text-start d-flex justify-content-center' style={{gap:"24px"}}>
                <button className='andent-button-perm'>
                    <h2 className='button-text'>
                            Create Role<span style={{marginLeft:"8px",bottom:"2px",position:"relative"}}>
                    <img src={plus} alt='genlink icon' className='small-icon'/>
                    </span>
                    </h2>
                </button>
                </div>
            </div>
        </> 
    )
}

export default AddRole;