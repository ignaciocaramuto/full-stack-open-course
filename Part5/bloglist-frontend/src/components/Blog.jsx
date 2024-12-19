import { useState } from 'react'

const Blog = ({ blog, handleUpdate }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const onLikeClick = () => {    
    handleUpdate(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <span>{blog.title} {blog.author}</span>
          <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>{ blog.url }</p>
        <p>likes: { blog.likes }</p>
        <button onClick={() => onLikeClick()}>like</button>
        <p>{ blog.user.name }</p>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog