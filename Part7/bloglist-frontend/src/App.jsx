import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "./services/blogs";
import Notification from "./components/Notification.jsx";
import BlogList from "./components/BlogList.jsx";
import { setUser, removeUser } from "./reducers/userReducer.js";
import LoginForm from "./components/LoginForm.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList.jsx";
import UserDetail from "./components/UserDetail.jsx";
import BlogDetail from "./components/BlogDetail.jsx";
import { Button } from "react-bootstrap";
import { useState } from "react";
import NewBlogForm from "./components/NewBlogForm.jsx";

const App = () => {
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {
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
    return <LoginForm />
  }

  return (
    <Router>
      <div className="container">
        <Notification />
        <nav>
          <Link to="/">Blogs</Link> | <Link to="/users">Users</Link>
          <p>{user.name} logged in <Button onClick={logOut}>log out</Button> </p>
          <Button variant="primary" onClick={() => setShowNewBlogForm(!showNewBlogForm)}>Create new</Button>
        </nav>

        {showNewBlogForm && <NewBlogForm />}

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<UserDetail />} />
          <Route path="/blogs/:blogId" element={<BlogDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;

