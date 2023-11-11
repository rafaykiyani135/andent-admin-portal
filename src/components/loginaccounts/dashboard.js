import Sidebar from "../dashboardcomp/sidebar";
import LoginContent from "./content";
import Header from "../header";

function LoggedIn(){
    return(
        <> 
        <Header/>       
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <LoginContent/>
        </div>
        </>

    )
}

export default LoggedIn;