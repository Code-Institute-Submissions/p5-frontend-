import React, {useState} from 'react'
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../App.module.css';
import axios from 'axios';

const RegisterForm = () => {
    const [registerData, setRegisterData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
const {username, password1, password2} = registerData;

const [errors, setErrors] = useState({});

const navigate = useNavigate();

const handleChange = (e) =>{
    setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", registerData);
      navigate("/signin");
    } catch (error) {
        setErrors(error.response?.data);
    }
  };

  return (
    <Row> 
        <Col>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label className='d-none'>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Username" 
                            name='username' 
                            value={username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.username?.map((message, idx)=>(
                        <Alert variant='light' key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Group className="mb-3" controlId="password1">
                        <Form.Label className='d-none'>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            name="password1" 
                            value={password1}
                            onChange={handleChange}/>
                    </Form.Group>

                    {errors.password1?.map((message, idx) => (
                        <Alert key={idx} variant='light'>
                            {message}
                        </Alert>
                    ))}
                    <Form.Group className="mb-3" controlId="password2">
                        <Form.Label className='d-none'>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm password" 
                            name="password2" 
                            value={password2}
                            onChange={handleChange}/>
                    </Form.Group>
                    {errors.password2?.map((message, idx) => (
                        <Alert key={idx} variant='light'>
                            {message}
                        </Alert>
                    ))}
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    <Link to='/signin' className={styles.Link}>
                        <span>Sign In</span>
                    </Link>
                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert key={idx} variant='light'>
                            {message}
                        </Alert>
                    ))}
                    
                    
                </Form>
            </Container>
        </Col>

  </Row>
  )
}

export default RegisterForm