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
        likes: 0
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
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
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

export const { createBlog, appendBlog, setBlogs, remove, like } = blogSlice.actions
export default blogSlice.reducer
