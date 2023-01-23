import React, {useEffect, useState} from 'react';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';


function EditListForm() {
    const [errors, setErrors] = useState({});

    const [listData, setListData] = useState({
        title: '',
        description:'',
    })
    const {title, description} = listData;
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        const handleMount = async ()=>{
            try {
             const {data} = await axiosReq.get(`/lists/${id}/`)
             const {title, description, is_owner} = data;

             is_owner ? setListData({title, description}) : navigate('/');
            } catch (error) {
                console.log(error)
            }
        };
        handleMount();
    },[navigate, id]);

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
            await axiosReq.put('/lists/', formData);
            navigate(`/lists/${id}`)

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

export default EditListForm;