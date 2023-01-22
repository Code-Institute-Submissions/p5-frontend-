import React, { useEffect, useState } from 'react'
import { Container, Row, Col, NavLink } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import List from './List';

export default function ListDetailPage() {
    const {id} = useParams();
    const [list, setList] = useState({results: []})

    useEffect(()=>{
        const handleMount = async () =>{
            try {
                const [{data: list}] = await Promise.all([
                    axiosReq.get(`/lists/${id}`)
                ])
                setList({results:[list]})
                console.log(list)
            } catch (error) {
                console.log(error);  
            }
        }
        handleMount();
    },[id])

  return (
    <Row>
        <Col>
            <Row>
                <NavLink>View All Lists</NavLink>
                <NavLink>Create Item</NavLink>
            </Row>
         <List {...list.results[0]} setLists={setList}/>
         <Container>Comments</Container> 
        </Col>
        <Col>
            <Row>
                <NavLink>View All Lists</NavLink>
                <NavLink>Create Item</NavLink>
            </Row>
        </Col>
    </Row>
  )
}
