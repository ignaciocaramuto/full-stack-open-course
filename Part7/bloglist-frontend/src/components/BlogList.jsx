import { useDispatch } from "react-redux"
import Blog from "./Blog"
import { likeBlog, removeBlog } from "../reducers/blogReducer"
import { useSelector } from "react-redux"

const BlogList = () => {

  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  const handleUpdate = async (blog) => {
    dispatch(likeBlog({
      ...blog,
      likes: blog.likes + 1,
    }))
  }

  const handleRemove = async (id) => {
    dispatch(removeBlog(id))
  };

  return (
    <div data-testid="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  )
}

export default BlogList
