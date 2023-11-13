import React, { useState,useRef,useEffect } from 'react';
import search from '../../assets/data/search.png'
import genlink from '../../assets/data/generatelink.png'
import addclient from '../../assets/data/addclient.png'
import Table from './table';
import MagicLink from './magiclink';
import GLink from './linkgenerated';
import NewClient from './newclient';

function Content() {

  const [magicOpen,setMagicOpen] = useState(false)  
  const [dataFromChild, setDataFromChild] = useState(''); 
  const [link,setLink] = useState(false);
  const menuRef=useRef();
  const menuRef2=useRef();
  const menuRef3=useRef();
  const [newcl,setNewcl] = useState(false);

  useEffect(()=>{
    let handler = (e)  =>{
        if(!menuRef3.current.contains(e.target)){
            setLink(false);
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
            setMagicOpen(false);
        }
    }

    document.addEventListener("mousedown",handler);

    return()=>{
        document.removeEventListener("mousedown",handler)
    }
    },[])

    useEffect(()=>{
        let handler = (e)  =>{
            if(!menuRef2.current.contains(e.target)){
                setNewcl(false)
            }
        }
    
        document.addEventListener("mousedown",handler);
    
        return()=>{
            document.removeEventListener("mousedown",handler)
        }
    },[])

    const handleDataFromChild = (data) => {
        setDataFromChild(data);
        setMagicOpen(false);
        setLink(true)
    };

  return (
    <div className='client-content' style={{overflowX:"hidden"}}>
      <div className='row justify-content-around align-items-center'>
        <div className='col-lg-5 col-md-12 col-12 largetext-pos-3'>
            <div className='search-bar-container'>
                <input placeholder='Search client email' className='searchbar searchbar-text'/>
                <div className='searchbar-des d-none d-md-block'>
                    <img src={search} className='small-icon search-icon' alt='search-icon'/>
                </div>
            </div>
        </div>
        <div className='col-lg-2 col-md-6 col-4 d-flex align-items-center largetext-pos-2'>
            <h2 className='client-top-text'>
                All clients
            </h2>
        </div>
        <div className='col-lg-4 col-md-6 col-12 d-flex justify-content-center justify-content-md-end mob-top-pad' style={{gap:"12px"}}>
            <button className='andent-button' onClick={()=>{setMagicOpen(true)}}>
                <img src={genlink} alt='genlink icon' className='small-icon'/><span>
                    <h2 className='button-text'>
                        Magic Link
                    </h2>
                </span>
            </button>
            <button className='andent-button' onClick={()=>{setNewcl(true)}}>
                <img src={addclient} alt='genlink icon' className='small-icon'/><span>
                    <h2 className='button-text'>
                        New Client
                    </h2>
                </span>
            </button>
        </div>
        <div className={`${magicOpen? `magiclink` : `d-none`}`} style={{zIndex:"1"}} ref={menuRef}>
            <MagicLink sendDataToParent={handleDataFromChild}/>
        </div>
      </div>
      <div className='row table-parent' style={{paddingTop:"20px"}}>
      <Table/>
      </div>
      <div className={`${link? `gen-link` : `d-none`}`} ref={menuRef3}>
            <GLink language={dataFromChild}/>
      </div>
      <div className={`${newcl? `new-client` : `d-none`}`} ref={menuRef2}>
            <NewClient/>
      </div>
    </div>
  );
}

export default Content;