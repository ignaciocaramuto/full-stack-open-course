import { useDispatch } from "react-redux";
import { commentBlog, likeBlog, removeBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const BlogDetail = () => {

  const { blogId } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((b) => b.id === blogId)
  );

  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const [comment, setComment] = useState("");

  const onLikeClick = () => {
    dispatch(likeBlog({
      ...blog,
      likes: blog.likes + 1,
    }))
  };

  const onRemoveClick = (id) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );

    if (!confirm) return;

    dispatch(removeBlog(id))
  }

  const onCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() === "") return;

    dispatch(commentBlog(blog.id, comment));
    setComment("");
  };

  return (
    <div>
      <span>{blog.url}</span>
      <p className="likes">likes: {blog.likes}</p>
      <Button onClick={() => onLikeClick()}>like</Button>
      <p>{blog.user.name}</p>
      <Button onClick={() => onRemoveClick(blog.id)}>remove</Button>

      <h3>Comments</h3>
      <Form onSubmit={onCommentSubmit}>
        <Form.Group>
          <Form.Label>Add a comment:</Form.Label>
          <Form.Control
            type="text"
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          add comment
        </Button>
      </Form>

      <ul>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((c, index) => <li key={index}>{c}</li>)
        ) : (
          <p>No comments yet</p>
        )}
      </ul>
    </div>
  )
}

export default BlogDetail
