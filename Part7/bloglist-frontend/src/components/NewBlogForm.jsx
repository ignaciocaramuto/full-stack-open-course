import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";
import { notification } from "../reducers/notificationReducer";
import { Button, Form } from "react-bootstrap";

const NewBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch()

  const handleNewBlog = async (blogObject) => {
    try {
      dispatch(addBlog(blogObject))
      dispatch(notification({ message: `A new blog ${blogObject.title} by ${blogObject.author} added` }, 5))
    } catch (exception) {
      dispatch(notification({ message: exception.response.data.error, type: "erorr" }, 5))
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    handleNewBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={({ target }) => setTitle(target.value)}

          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default NewBlogForm;
