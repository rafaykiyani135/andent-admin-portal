import { Link } from "react-router-dom";
import { useState } from "react";
import arrow from '../../assets/data/arrow.png'
import del from '../../assets/data/delete.png'

function UserAccounts(){

    let tableData = [
        { id: 1, userName: 'john12', userEmail: 'JohnDoe@yahoo.com', userRole: 'Partner', delUser: 'Delete'},
        { id: 2, userName: 'babar12', userEmail: 'babarkohli@gmail.com', userRole: 'Admin', delUser: 'Delete'},
    ];

    const [dropdownStates, setDropdownStates] = useState(Array(tableData.length).fill(false));
    const [selectedRole, setSelectedRole] = useState(Array(tableData.length).fill()); // Initialize with empty string

    const toggleDropdown = (index) => {
        setDropdownStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[index] = !newStates[index];
          return newStates;
        });
    };

    const handleStatusSelection = (index, selectedValue) => {
        // Update the selected status in the state
        setSelectedRole((prevSelectedRole) => {
          const newSelectedRole = [...prevSelectedRole];
          newSelectedRole[index] = selectedValue;
          return newSelectedRole;
        });
    
        // Update the tableData based on the selected status
        const updatedTableData = tableData.map((rowData, i) => {
          if (i === index) {
            return { ...rowData, userRole: selectedValue };
          }
          return rowData;
        });
    
        // Set the updated tableData
        tableData = updatedTableData;
    };

    const handleDelete = (data) =>{
        console.log("row to be deleted ",data);
    }

    return(
        <div className="table-container" style={{marginLeft:"-4px"}} >
            <table className='andent-table'>
            <thead>
                <tr>
                <th scope="col" className=" box-size-2" style={{borderRadius:"4px 0px 0px 0px"}}>Sr. No</th>
                <th scope="col" className=" box-size-3">User Name</th>
                <th scope="col" className=" box-size-3">User Email</th>
                <th scope="col" className=" box-size-3">User role</th>
                <th scope="col" className=" box-size-3" style={{borderRadius:"0px 4px 0px 0px"}}>Delete User</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, index) => (
                <tr key={row.id}>
                    <td className="box-size-2">{index + 1}</td>
                    <td className="box-size-3">{row.userName}</td>
                    <td className="box-size-3">{row.userEmail}</td>
                    <td  onClick={() => toggleDropdown(index)} className='text-start' style={{listStyleType:"none"}}>
                            <Link style={{textDecoration:"none",color:"#4B5768"}}>
                            <li className='text-center update-status' >
                                {selectedRole[index] || row.userRole} <img src={arrow} alt='arrow-icon' className='small-icon'/>
                            </li>
                            </Link>
                            <Link style={{textDecoration:"none",color:"#4B5768"}}>
                            <div className={`dropdown-content-accounts ${dropdownStates[index] ? 'open' : ''} justify-content-end`} >
                                <li onClick={() => handleStatusSelection(index, 'Admin')}>Admin</li>
                                <li onClick={() => handleStatusSelection(index, 'Partner')}>Partner</li>
                            </div>
                            </Link>
                            <div className={`${dropdownStates[index]? 'dropdown-overlay' : ''}`}>
                            {//Dropdown opacity logic
                            }
                        </div>
                    </td>
                    <td className="box-size-3">
                        <Link style={{textDecoration:"none"}} onClick={()=>{handleDelete(row)}}>
                        <img src={del} alt="delete-icon" className="small-icon" />
                        </Link>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default UserAccounts;