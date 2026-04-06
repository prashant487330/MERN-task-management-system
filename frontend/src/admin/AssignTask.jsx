import axios from "axios";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
const AssignTask = () => {
    const [mydata, setMydata] = useState([]);
    const [empid, setEmpId] = useState("");
    const [emptask, setEmpTask] = useState("");
    const [days, setDays] = useState("");
    const [priority, setPriority] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (uid) => {
        setShow(true);
        setEmpId(uid)
    }
    const loadData = async () => {
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/admin/getempdata`;
            const response = await axios.get(api);
            console.log(response.data);
            setMydata(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    const handleSubmitTask = async (e) => {
        e.preventDefault();
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/admin/assigntask`;
            const response = await axios.post(api, { empid, emptask, days, priority });
            console.log(response.data);
            toast.success(response.data.msg || "Task Assigned");
            handleClose();
        } catch (error) {
            console.log(error);
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
                    <td>{key.name}</td>
                    <td>{key.email}</td>
                    <td>{key.post}</td>
                    <td><button variant="primary" onClick={() => { handleShow(key._id) }}
                        style={{ background: "green", color: "#fff", borderRadius: "10px", }}>
                        Assign Task</button></td>
                </tr>
            </>
        )
    })
    return (
        <>
            <h1 className="login-title">Assigntask</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Post</th>
                        <th>AssignTask</th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter Task</Form.Label>
                            <Form.Control type="text" value={emptask} onChange={(e) => { setEmpTask(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="text" value={days} onChange={(e) => { setDays(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Select aria-label="Default select example" value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                                <option>Priority</option>
                                <option value="highpriority">High Priority</option>
                                <option value="mediumpriority">Medium Priority</option>
                                <option value="lowpriority">Low Priority</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleSubmitTask}>
                        Submit
                    </Button>
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
export default AssignTask;