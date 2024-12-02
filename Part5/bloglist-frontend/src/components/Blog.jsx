
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
        <button onClick={toggleVisibility}>{ visible ? 'hide' : 'view' }</button>
    </div>
    <div style={showWhenVisible}>
      <span>{ blog.url }</span>
      <span>{ blog.likes }</span>
      <span>{ blog.author }</span>
    </div>
  </div>
  )
}

export default Blog