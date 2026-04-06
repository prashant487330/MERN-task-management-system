import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Home = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usertype, setUserType] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usertype == "admin") {
            try {
                let api = `${import.meta.env.VITE_BACKEND_URL}/admin/adminlogin`;
                const response = await axios.post(api, { email, password });
                localStorage.setItem("admin", response.data.admin.email);
                console.log(response);
                toast.success(response.data.msg);
                setTimeout(() => {
                    navigate("/admindashboard");
                }, 1000);
                
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.msg);
            }
        } else {
            try {
                let api = `${import.meta.env.VITE_BACKEND_URL}/employee/employeelogin`;
                const response = await axios.post(api, { email, password });
                console.log(response);
                localStorage.setItem("empname", response.data.employee.name);
                localStorage.setItem("empemail", response.data.employee.email);
                localStorage.setItem("empid", response.data.employee._id);
                toast.success(response.data.msg);
                setTimeout(() => {
                    navigate("/employeedashboard");
                }, 2000);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.msg);
            }
        }
    }
    return (
        <>
        <ToastContainer position="top-right" autoClose={2000} />
            <div id="header">
                <h1>Task Management System</h1>
            </div>
            <h2 className="login-title"> User Login</h2>
            <Form style={{ width: "400px", margin: "auto" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Email</Form.Label>
                    <Form.Control type="email" name='email' onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" name='password' onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Login As</Form.Label>
                    <Form.Select aria-label="Default select example" name='usertype' onChange={(e) => { setUserType(e.target.value) }}>
                        <option>Select User Type</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
            <div id="footer">
                www.taskmanagement.com <br />
                All Rights are Reserved @2026
            </div>
        </>
    )
}
export default Home;