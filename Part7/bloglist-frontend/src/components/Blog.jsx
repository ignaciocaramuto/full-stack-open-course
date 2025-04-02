import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
}

export default Blog;
