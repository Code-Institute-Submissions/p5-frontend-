import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ItemCreateForm(props) {
  const { list, setList, setItems, profileImage, profile_id } = props;
  const [itemData, setItemData] = useState({
    title: '',
    description:'',
    due_date:'',
    priority:'',
    file:'',
  });

  const {title, description, due_date, priority, file} = itemData;
  const fileInput = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    })
  };

  const handleChangeFile = (e) =>{
    if (e.target.files.length){
      URL.revokeObjectURL(file);
      setItemData({
        ...itemData,
        file: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('due_date', due_date);
    formData.append('priority', priority);
    formData.append('file', fileInput.current.files[0]);

    try {
      const { data } = await axiosRes.post("/items/", FormData);
      setItems((prevItems) => ({
        ...prevItems,
        results: [data, ...prevItems.results],
      }));
      setList((prevList) => ({
        results: [
          {
            ...prevList.results[0],
            items_count: prevList.results[0].items_count + 1,
          },
        ],
      }));
      setItemData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            placeholder="my comment..."
            as="textarea"
            value={description}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`btn d-block ml-auto`}
        disabled={!description.trim()}
        type="submit"
      >
        Create Item
      </button>
    </Form>
  );
}

export default ItemCreateForm;