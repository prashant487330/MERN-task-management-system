import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
const CompletedTask = () => {
    const [mydata, setMydata] = useState([]);
    const loadData = async () => {
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/employee/showcompletedtask/?id=${localStorage.getItem("empid")}`;
            const response = await axios.get(api);
            console.log(response.data);
            setMydata(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadData();
    }, [])
    let sno = 0;
    const ans = mydata.map((key) => {
        sno++;
        return (
            <>
                <tr>
                    <td>{sno}</td>
                    <td>{key.emptask}</td>
                    <td>{key.days}</td>
                    <td>{key.priority}</td>
                </tr>
            </>
        )
    })
    return (
        <>
            <h1 className="login-title">Completed Task</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Task Name</th>
                        <th>Duration in Day's</th>
                        <th>Task Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </Table>
        </>
    )
}
export default CompletedTask;