import React, {useState} from 'react';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';



function CreateListForm() {
    const [errors, setErrors] = useState({});

    const [listData, setListData] = useState({
        title: '',
        description:'',
    })
    const {title, description} = listData;

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setListData({
            ...listData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        
        try {
            const {data} = await axiosReq.post('/lists/', formData);
            navigate(`/lists/${data.id}`)
        } catch (error) {
            if (error.response?.staus !==401){
                setErrors(error.respone?.data);
            }
        }
    }

    const textFields = (
      <div className="text-center">
        <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control 
                type='text' 
                name='title' 
                value={title}
                onChange={handleChange}/>
        </Form.Group>
        {errors.title?.map((message, idx)=>(
          <Alert variant='light' key={idx}>
          {message}
          </Alert>
          ))}
        <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control 
                as='textarea' 
                rows={3} 
                name='description' 
                placeholder='Write a short description of the list' 
                value={description}
                onChange={handleChange}/>
        </Form.Group>
        {errors.description?.map((message, idx)=>(
          <Alert variant='light' key={idx}>
          {message}
          </Alert>
          ))}
        <Button
          onClick={() => {}}
        >
          cancel
        </Button>
        <Button type="submit">
          create
        </Button>
      </div>
    );

  return (
    <Form onSubmit={handleSubmit}>
        <Container>
            {textFields}
        </Container>
    </Form>
  )
}

export default CreateListForm;