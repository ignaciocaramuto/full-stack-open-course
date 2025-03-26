import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login.js";
import Button from "./components/Button.jsx";
import NewBlogForm from "./components/NewBlogForm.jsx";
import Notification from "./components/Notification.jsx";
import Togglable from "./components/Togglable.jsx";
import { useDispatch } from "react-redux";
import BlogList from "./components/BlogList.jsx";
import { initializeBlogs } from "./reducers/blogReducer.js";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const logOut = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      // setNotification("User logged in successfully");
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      // setNotification(exception.response.data.error, "error");
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <Button handleClick={logOut} text="logout" />

      <Togglable buttonLabel="new blog">
        <NewBlogForm />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default App;
