import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const CreateUser = () => {
    const [input, setInput] = useState({});
    const handleinput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput(values => ({ ...values, [name]: value }));
        console.log(input);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/admin/createuser`;
            const response = await axios.post(api, input);
            console.log(response);
            toast.success(response.data.msg);
        } catch (error) {
            console.log(error);
            toast.error(response.data.msg);
        }
    }
    return (
        <>
        <ToastContainer position="top-right" autoClose={4000} />
            <h1 className="login-title">Createuser</h1>
            <Form style={{ width: "600px", margin: "auto" }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control type="name" name='name' placeholder="Enter Name" onChange={handleinput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter Email</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter Email" onChange={handleinput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Select aria-label="Default select example" name='post' onChange={handleinput}>
                        <option>Assign Post</option>
                        <option value="Programmer">Programmer</option>
                        <option value="Designer">Designer</option>
                        <option value="TeamLeader">TeamLeader</option>
                        <option value="Analyst">Analyst</option>
                        <option value="ProjectManager">ProjectManager</option>
                        <option value="DatabaseDesigner">DatabaseDesigner</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit} >
                    CreateUser
                </Button>
            </Form>
        </>
    )
}
export default CreateUser;