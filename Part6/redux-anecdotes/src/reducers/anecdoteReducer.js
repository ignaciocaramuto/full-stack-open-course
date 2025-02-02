import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const index = state.findIndex(anecdote => anecdote.id === action.payload)

      if (index === -1) {
        return state
      }

      const anecdote = state[index];
      anecdote.votes++

      state[index] = anecdote

      return state.sort((a, b) => b.votes - a.votes)
    },
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
