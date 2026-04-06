import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
const EmployeeTask = () => {
    const [mydata, setMydata] = useState([]);
    const [show, setShow] = useState(false);
    const [taskstatus, setTaskStatus] = useState("");
    const [completionday, setCompletionDay] = useState("");
    const [taskid, setTaskId] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setTaskId(id)
        setShow(true);
    }
    const loadData = async () => {
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/employee/getemptask/?id=${localStorage.getItem("empid")}`;
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
    const handleSubmitTask = async (e) => {
        e.preventDefault();
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/employee/settaskstatus`;
            const response = await axios.post(api, { taskid, taskstatus, completionday })
            console.log(response.data);
            toast.success(response.data.msg || "Report Sent");
            handleClose();
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
                    <td>{key.emptask}</td>
                    <td>{key.days}</td>
                    <td>{key.priority}</td>
                    <td>
                    <Button variant="primary" onClick={() => { handleShow(key._id) }}
                    style={{ background: "green", color: "#fff", borderRadius: "10px", }}>Send Report</Button>
                    </td>
                </tr>
            </>
        )
    })
    return (
        <>
            <h1 className="login-title">Employee Tasks</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Task</th>
                        <th>Completion Days</th>
                        <th>Priority</th>
                        <th>SendReport</th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Select Task Status</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => { setTaskStatus(e.target.value)}}>
                                <option>Task Status</option>
                                <option value="Fully Completed">Fully Completed</option>
                                <option value="Partial Completed">Partial Completed</option>
                                <option value="No Complete">No Complete</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Enter Completion days</Form.Label>
                            <Form.Control type="text" onChange={(e) => { setCompletionDay(e.target.value)}} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmitTask}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}
export default EmployeeTask;