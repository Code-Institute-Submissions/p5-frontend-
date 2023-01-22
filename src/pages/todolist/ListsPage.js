import React from "react";
import {Form, Col, Row, Container, NavLink} from "react-bootstrap";

function ListPage() {
  
  return (
    <Row>
      <Col>
            <Row>
                <NavLink>View All Lists</NavLink>
                <NavLink>Create Item</NavLink>
            </Row>
        <p>List of posts here</p>
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