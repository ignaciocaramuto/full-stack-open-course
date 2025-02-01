import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
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
      console.log(state, action)
      return state.concat(asObject(action.payload))
    }
  }
})

export const { vote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
