import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/authContext";
import Button from "./Button";

const Navbar = ()=>{
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        logout();
        navigate('/login');
    }

    return(
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h1 onClick={()=> navigate('/projects')} className="text-xl font-bold text-blue-600 cursor-pointer">Project Manager</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Hello, {user?.name}</span>
                <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </div>
        </nav>
    )
}

export default Navbar;