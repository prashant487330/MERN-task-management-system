import { Link,Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const EmployeeDashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("empemail")) {
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
                <h1 id="admin-heading">Welcome to Employee Dashboard</h1>
                <button className="logout-btn" onClick={logOut}>Logout</button>
                <div id="admin-menu">
                    <h2>Employee Menu</h2>
                    <ul>
                        <li><Link to="employeetask">Employee Task</Link></li>
                        <li><Link to="completedtask">Completed Task</Link></li>
                    </ul>
                </div>
                <div id="admin-content">
                    <h2 style={{textAlign:"center",background:"aqua"}}>Welcome:{localStorage.getItem("empname")}</h2>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default EmployeeDashboard;