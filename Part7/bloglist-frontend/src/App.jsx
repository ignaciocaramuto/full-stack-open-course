import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "./services/blogs";
import Button from "./components/Button.jsx";
import NewBlogForm from "./components/NewBlogForm.jsx";
import Notification from "./components/Notification.jsx";
import Togglable from "./components/Togglable.jsx";
import BlogList from "./components/BlogList.jsx";
import { initializeBlogs } from "./reducers/blogReducer.js";
import { setUser, removeUser } from "./reducers/userReducer.js";
import LoginForm from "./components/LoginForm.jsx";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());

    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(removeUser());
  };

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
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

