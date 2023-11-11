import Sidebar from "../dashboardcomp/sidebar";
import RolesContent from "./content";
import Header from "../header";

function Roles(){
    return(
        <>
        <Header/>
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <RolesContent/>
        </div>
        </>
    )
}

export default Roles;