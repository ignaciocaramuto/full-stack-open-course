import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
import { setNotification } from "./notificationReducer"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const index = state.findIndex(anecdote => anecdote.id === action.payload.id)

      if (index === -1) {
        return state
      }

      state[index] = action.payload

      return state
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch(vote(updatedAnecdote))
  }
}


export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
