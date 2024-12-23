import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Button from './components/Button.jsx'
import NewBlogForm from './components/NewBlogForm.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotificationMessage] = useState(null)

  const logOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const setNotification = (message, type) => {
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleNewBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      setBlogs(blogs.concat(blogObject))
      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (exception) {
      setNotification(exception.response.data.error, "error")
    }
  }

    const handleUpdate = async (blog) => {
      try {
        const blogUpdated = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
        const blogsUpdated = blogs
          .map(blog => blog.id === blogUpdated.id ? blogUpdated : blog)
          .sort((a, b) => b.likes - a.likes)
        setBlogs(blogsUpdated)
      }
      catch (exception) {
        console.error(exception)
      }
    }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setNotification('User logged in successfully')
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {  
      setNotification(exception.response.data.error, "error")
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <Button handleClick={logOut} text="logout"  />

      <Togglable buttonLabel="new blog">
        <NewBlogForm handleNewBlog={handleNewBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} />
      )}
    </div>
  )
}

export default App