import React, { useEffect, useState } from "react";
import {Form, Col, Row, Container, NavLink} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import List from "./List";
import styles from "../../styles/ListsPage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function ListPage({message, filter}) {
    const [lists, setLists] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation(); 

    const [query, setQuery] = useState('');

    useEffect(()=>{
        const fetchLists = async () => {
            try {
                const {data} = await axiosReq.get(`/lists/?${filter}search=${query}`)
                setLists(data)
                setHasLoaded(true)
                console.log(query);
            } catch (error) {
                console.log(error)
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
        fetchLists()
        }, 1000);
        return () => {
            clearTimeout(timer);
          };
    },[filter, query, pathname])
  
  return (
    <Row>
      <Col>
            <Row>
                <Col>
                    <NavLink>View All Lists</NavLink>
                </Col>
                <Col>
                    <NavLink>Create List</NavLink>
                </Col>
            </Row>
            <Row>
                <i className={`fas fa-search ${styles.SearchIcon}`}></i>
                <Form onSubmit={(e)=> e.preventDefault()} className={styles.SearchBar}>
                    <Form.Control type='text'
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)} 
                        className="mr-sm-2"
                        placeholder="Search for a list or item"/>
                </Form>
            </Row>
            <Row>
                {hasLoaded?(
                <>
                    {lists.results.length? (
                        <InfiniteScroll children={
                            lists.results.map((list) =>(
                                <List key={list.id} {...list} setLists={setLists}/>
                            ))
                        }
                        dataLength={lists.results.length}
                        loader={<Asset spinner/>}
                        hasMore={!!lists.next}
                        next={()=> fetchMoreData(lists, setLists)}
                        />
                        
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
                <NavLink>Create List</NavLink>
            </Row>
      </Col>
    </Row>
  );
}

export default ListPage;