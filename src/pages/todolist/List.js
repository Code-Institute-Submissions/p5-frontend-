import React from 'react'
import { Col, ToggleButton, Row} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';

const List = (props) => {
    const {
        id,
        completed,
        title,
        description,
        is_owner,
        items_count,
        owner,
        profile_id,
        profile_image

    } = props

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/lists/${id}/edit`);
      };
    
      const handleDelete = async () => {
        try {
          await axiosRes.delete(`/lists/${id}/`);
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <Card>
        <Card.Header><span className=''>{title}</span><span className="text-muted">, created by: {owner}<Avatar src={profile_image}/></span></Card.Header>
        <Card.Body>
            <Card.Text>
                {description}
            </Card.Text>
            <Card.Body>
                {completed? (
                     <p>List is completed</p>
                ): (
                    <>
                        <Row>
                            <Col>
                                Item1
                            </Col>
                            <Col>
                                Item2
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Item3
                            </Col>
                            <Col>
                                Item4
                            </Col>
                        </Row>
                    </>
                )}
            </Card.Body>
            {is_owner?(
                <Card.Footer className="text-muted">
                    <span>Items:{items_count} </span>
                    <ToggleButton
                        className="mb-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={completed}
                        value="1"
                        onChange={() => {}}
                        >
                        Completed
                      </ToggleButton>
                      <a onClick={handleEdit}>Edit</a>
                      <a onClick={handleDelete}>Delete</a>
                </Card.Footer>

            ):(
                <Card.Footer className="text-muted">
                <span>Items:{items_count} </span>
                </Card.Footer> 
            )}
            
        </Card.Body>
    </Card>
  )
}

export default List