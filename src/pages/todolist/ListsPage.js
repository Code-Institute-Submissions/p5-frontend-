import axios from "axios";
import React, { useEffect, useState } from "react";
import {Form, Col, Row, Container, NavLink} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import List from "./List";

function ListPage({message, filter}) {
    const [lists, setLists] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation(); 

    useEffect(()=>{
        const fetchLists = async () => {
            try {
                const {data} = await axiosReq.get(`/lists/?${filter}`)
                setLists(data)
                setHasLoaded(true)
            } catch (error) {
                console.log(error)
            }
        }
        setHasLoaded(false);
        fetchLists()
    },[filter, pathname])
  
  return (
    <Row>
      <Col>
            <Row>
                <NavLink>View All Lists</NavLink>
                <NavLink>Create Item</NavLink>
            </Row>
            <Row>
                {hasLoaded?(
                <>
                    {lists.results.length? (
                        lists.results.map((list) =>(
                            <List key={list.id} {...list} setLists={setLists}/>
                        ))
                    ) :(
                        <Container>
                            <Asset message={message}/>
                        </Container>
                    )}
                </>

                ): (
                    <Container>
                        <Asset spinner/>
                    </Container>
                )}
            </Row>
      </Col>
      <Col >
            <Row>
                <NavLink>View All Lists</NavLink>
                <NavLink>Create Item</NavLink>
            </Row>
      </Col>
    </Row>
  );
}

export default ListPage;