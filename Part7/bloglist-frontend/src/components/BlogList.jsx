import { useDispatch } from "react-redux"
import Blog from "./Blog"
import { initializeBlogs } from "../reducers/blogReducer"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Table } from "react-bootstrap"

const BlogList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [])

  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  })


  return (
    <div>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Blog key={blog.id} blog={blog} />
              </td>
              <td>
                {blog.user.name}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
