import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
const Reports = () => {
    const [mydata, setMydata] = useState([]);
    const loadData = async () => {
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/admin/gettaskreport`;
            const response = await axios.get(api);
            console.log(response.data);
            setMydata(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadData();
    }, [])
    const taskReassign = async (id) => {
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/admin/taskreassign/?tid=${id}`;
            const response =await axios.post(api);
            console.log(response.data);
            toast.success(response.data.msg || "Task Reassigned");
        } catch (error) {
            console.log(error)
            toast.error(response.data.msg || "Something went Wrong");
        }
    }
    let sno = 0;
    const ans = mydata.map((key) => {
        sno++;
        return (
            <>
                <tr>
                    <td>{sno}</td>
                    <td>{key.empid.name}</td>
                    <td>{key.empid.email}</td>
                    <td>{key.emptask}</td>
                    <td>{key.days}</td>
                    <td>{key.priority}</td>
                    <td>{key.taskstatus}</td>
                    <td>{key.completionday}</td>
                    <td>
                        <Button variant="primary" onClick={() => { taskReassign(key._id) }}
                            style={{ background: "green", color: "#fff", borderRadius: "10px", }}>Task Reassign</Button>
                    </td>
                    <td></td>
                </tr>
            </>
        )
    })
    return (
        <>
            <h1 className="login-title">Reports</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Task</th>
                        <th>Given Days</th>
                        <th>Priority</th>
                        <th>Task Status</th>
                        <th>Completion Days</th>
                        <th>ReAssign</th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </Table>
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}
export default Reports;