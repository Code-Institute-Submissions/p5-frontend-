import React, {useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';



function CreateItemForm() {
    const [errors, setErrors] = useState({});

    const [listData, setListData] = useState({
        title: '',
        description:'',
    })
    const {title, description} = listData;

    const handleChange = (e) =>{
        setListData({
            ...listData,
            [e.target.name]:e.target.value,
        });
    };

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
    <Form>
        <Container>
            {textFields}
        </Container>
    </Form>
  )
}

export default CreateItemForm;