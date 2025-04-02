import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs.js'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const content = action.payload
      state.push({
        content,
        likes: 0,
        comments: []
      })
    },
    like(state, action) {
      const index = state.findIndex(blog => blog.id === action.payload.id)

      if (index === -1) {
        return state
      }

      state[index] = action.payload

      return state
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    remove(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    addComment(state, action) {
      const { id, updatedBlog } = action.payload;
      const index = state.findIndex((blog) => blog.id === id);
      if (index !== -1) {
        state[index] = updatedBlog;
      }
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.update(blog.id, blog)
    dispatch(like(likedBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    blogService.remove(id)
    dispatch(remove(id))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(id, comment);
    dispatch(addComment({ id, updatedBlog }));
  };
};

export const { createBlog, appendBlog, setBlogs, remove, like, addComment } = blogSlice.actions
export default blogSlice.reducer
