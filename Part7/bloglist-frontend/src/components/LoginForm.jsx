import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { notification } from "../reducers/notificationReducer";
import { Button, Form } from "react-bootstrap";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      dispatch(notification({ message: "User logged in successfully" }, 5))
    } catch (exception) {
      dispatch(notification({ message: exception.response.data.error, type: "erorr" }, 5))
    }
  };

  return (
    <div className="container">
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
