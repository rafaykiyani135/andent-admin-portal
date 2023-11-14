import Login from "../components/login";
import Dashboard from "../components/dashboard";
import { Routes,Route } from "react-router-dom";
import '../assets/style.css'
import '../assets/responsive.css'
import '../index.css';
import LoggedIn from "../components/loginaccounts/dashboard";
import Roles from "../components/roles/dashboard";
import BookApt from "../components/magiclink/magicLink";


function Router(){
    return(
        <>  
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/clients' element={<Dashboard/>}/>
                <Route path='/accounts' element={<LoggedIn/>}/>
                <Route path='/roles' element={<Roles/>}/>
                <Route path='/booking' element={<BookApt/>}/>
            </Routes>
        </>
    );
}

export default Router;