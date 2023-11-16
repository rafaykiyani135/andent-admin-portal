import { useState } from 'react';
import invoice from '../../assets/data/invoice.png'
import { Link } from 'react-router-dom';
import arrow from '../../assets/data/arrow.png'
import Invoice from './invoice';
import { useRef,useEffect } from 'react';
import ModifyClient from './modifyclient';

function Table(){

    const [invoiceOpen,setInvoiceOpen] = useState(false);
    const [clientMail,setClientMail] = useState(null);
    const [newcl2,setNewcl2] = useState(false);
    const [modify,setModify] = useState([{
        id:"",source:"",clientName:"",email:"",number:"",invoice:"",status:""
    }]);
    const [isMac,setIsMac] = useState(false)
    const [isMobile,setIsMobile] = useState(false)

    const menuRef=useRef();
    const menuRef2=useRef();

    useEffect(()=>{
        if (window.innerWidth<760){
            setIsMobile(true);
        }
        else{
            setIsMobile(false);
        }
    },[])

    useEffect(()=>{
        if (window.innerWidth>1000 && window.innerWidth<1500){
            setIsMac(true);
        }
        else{
            setIsMac(false);
        }
    },[])

    useEffect(()=>{
        let handler = (e)  =>{
            if(!menuRef2.current.contains(e.target)){
                setNewcl2(false);
            }
        }

        document.addEventListener("mousedown",handler);

        return()=>{
            document.removeEventListener("mousedown",handler)
        }
    },[])

    useEffect(()=>{
        let handler = (e)  =>{
            if(!menuRef.current.contains(e.target)){
                setInvoiceOpen(false);
            }
        }

        document.addEventListener("mousedown",handler);

        return()=>{
            document.removeEventListener("mousedown",handler)
        }
    },[])


    const handleInvoiceMaker = (email) =>{
        setInvoiceOpen(true);
        setClientMail(email);
    }

    let tableData = [
        { id: 1, source: 'Magic Link', clientName: 'John Doe', email: 'john@example.com', number: '123-456-7890', invoice: 'Invoice 001', status: 'Active' },
        { id: 2, source: 'Website', clientName: 'Jane Smith', email: 'jane@example.com', number: '987-654-3210', invoice: 'Invoice 002', status: 'Inactive' },
        // Add more dummy data as needed
    ];

    const [dropdownStates, setDropdownStates] = useState(Array(tableData.length).fill(false));
    const [selectedStatus, setSelectedStatus] = useState(Array(tableData.length).fill('')); // Initialize with empty string

    const toggleDropdown = (index) => {
        setDropdownStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[index] = !newStates[index];
          return newStates;
        });
    };

    const handleStatusSelection = (index, selectedValue) => {
        // Update the selected status in the state
        setSelectedStatus((prevSelectedStatus) => {
          const newSelectedStatus = [...prevSelectedStatus];
          newSelectedStatus[index] = selectedValue;
          return newSelectedStatus;
        });
    
        // Update the tableData based on the selected status
        const updatedTableData = tableData.map((rowData, i) => {
          if (i === index) {
            return { ...rowData, status: selectedValue };
          }
          return rowData;
        });
    
        // Set the updated tableData
        tableData = updatedTableData;
    };

    const clickHandler = (data) =>{
        setModify(data);
        setTimeout(() => {
            console.log('End of the 2-second timer');
          }, 2000);
        setNewcl2(true);
    }

    return(
        <div className="table-container">
            <table className='andent-table'>
            <thead>
                <tr>
                <th scope="col" className="box-size" style={{borderRadius:"4px 0px 0px 0px"}}><h2 className='table-text-td'>
                    Sr. No</h2></th>
                <th scope="col" className="box-size">
                    <h2 className='table-text-td'>Source</h2></th>
                <th scope="col" className="box-size">
                    <h2 className='table-text-td'>Client Name</h2></th>
                <th scope="col" className={`box-size ${isMobile? `d-flex justify-content-center` : ``}`}>
                    <h2 className='table-text-td'>Email</h2></th>
                <th scope="col" className="box-size">
                    <h2 className='table-text-td'>Number</h2></th>
                <th scope="col" className="box-size">
                    <h2 className='table-text-td'>Send Invoice</h2></th>
                <th scope="col" className="box-size" style={{borderRadius:"0px 4px 0px 0px"}}>
                    <h2 className='table-text-td'>Client Status</h2></th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, index) => (
                <tr key={row.id}>
                    <td className="box-size"><h2 className='table-text'>
                        {index + 1}</h2></td>
                    <td className="box-size">
                        <h2 className='table-text'>{row.source}</h2></td>
                    <td className="box-size" onClick={()=>{clickHandler(row)}}>
                        <h2 className='table-text'>{row.clientName}</h2></td>
                    <td className="box-size">
                        <h2 className='table-text' style={{width:"auto",height:"auto"}}>{row.email}</h2></td>
                    <td className="box-size">
                        <h2 className='table-text'>{row.number}</h2></td>
                    <td className="box-size">
                        <Link onClick={() => handleInvoiceMaker(row.email)}>
                        <img src={invoice} alt="invoice-icon" className='small-icon'/>
                        </Link>
                    </td>
                    <td onClick={() => toggleDropdown(index)} className='text-start' style={{listStyleType:"none",width: isMac? "300px" : ""}}>
                        <div>
                        <Link style={{textDecoration:"none",color:"#4B5768"}}>
                        <li className='text-center'>
                            {selectedStatus[index] || ('Update Status')} <img src={arrow} alt='arrow-icon' className='small-icon'/>
                        </li>
                        </Link>
                        <div className={`dropdown-content-client-status ${dropdownStates[index] ? 'open' : ''} justify-content-end`} >
                            <li onClick={() => handleStatusSelection(index, 'Contacted')}>Contacted</li>
                            <li onClick={() => handleStatusSelection(index, 'Invoice Sent')}>Invoice Sent</li>
                            <li onClick={() => handleStatusSelection(index, 'Booked')}>Booked</li>
                            <li onClick={() => handleStatusSelection(index, 'Procedure Done')}>Procedure Done</li>
                            <li onClick={() => handleStatusSelection(index, 'Contact Again')}>Contact Again</li>
                        </div>
                        <div className={`${dropdownStates[index]? 'dropdown-overlay' : ''}`}>
                        {//Dropdown opacity logic
                        }
                       </div>
                       </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <div className={`${invoiceOpen? `invoice` : `d-none`}`} ref={menuRef}>
                   <Invoice mail={clientMail} />
            </div>
            <div className={`${newcl2? `new-client-2` : `d-none`}`} ref={menuRef2}>
                <ModifyClient data={modify}  />
            </div>
        </div>
    )
}

export default Table;