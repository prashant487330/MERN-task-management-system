import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("admin")) {
            navigate("/home")
        }
    }, []);
    const logOut=()=>{
           localStorage.clear(); 
           navigate("/home");
    }
    return (
        <>
            <div id="admincontainer">
                <h1 id="admin-heading">Welcome to Admin Dashboard</h1>
                <button className="logout-btn" onClick={logOut}>Logout</button>
                <div id="admin-menu">
                    <h2>Admin Menu</h2>
                    <ul>
                        <li><Link to="createuser">Create Users</Link></li>
                        <li><Link to="assigntask">Assign Tasks</Link></li>
                        <li><Link to="reports">Reports</Link></li>
                    </ul>
                </div>
                <div id="admin-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default AdminDashboard;