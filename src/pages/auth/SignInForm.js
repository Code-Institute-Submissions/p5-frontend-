import React, {useState} from 'react'
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../App.module.css';
import axios from 'axios';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';


function SignInForm() {
    const setCurrentUser = useSetCurrentUser();

    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    });
    const { username, password } = signInData;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const {data} = await axios.post('/dj-rest-auth/login/', signInData);
        setCurrentUser(data.user)
        navigate('/');
        } catch (error) {
            setErrors(error.response?.data);
        }
    };
    const handleChange = (e) => {
        setSignInData({
        ...signInData,
        [e.target.name]: e.target.value,
        });
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
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className='d-none'>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                name="password" 
                                value={password}
                                onChange={handleChange}/>
                        </Form.Group>
                        {errors.password?.map((message, idx) => (
                            <Alert key={idx} variant='light'>
                                {message}
                            </Alert>
                        ))}
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                        <Link to='/register' className={styles.Link}>
                            <span>Register an account</span>
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
    );
}
    
export default SignInForm;