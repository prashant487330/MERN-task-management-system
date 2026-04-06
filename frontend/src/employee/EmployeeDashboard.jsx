import { Link,Outlet } from "react-router-dom";
const EmployeeDashboard = () => {
    return (
        <>
            <div id="admincontainer">
                <h1 id="admin-heading">Welcome to Employee Dashboard</h1>
                <div id="admin-menu">
                    <h2>Employee Menu</h2>
                    <ul>
                        <li><Link to="employeetask">Employee Task</Link></li>
                        <li><Link to="completedtask">Completed Task</Link></li>
                    </ul>
                </div>
                <div id="admin-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default EmployeeDashboard;