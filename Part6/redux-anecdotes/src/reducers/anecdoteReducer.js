const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const addVote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id
    }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: asObject(content)
  }
}

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {

  if (action.type === 'VOTE') {
    const index = state.findIndex(anecdote => anecdote.id === action.payload.id)

    if (index === -1) {
      return state
    }

    const anecdote = state[index];
    anecdote.votes++

    state[index] = anecdote

    const newState = [...state]

    return newState.sort((a, b) => b.votes - a.votes)
  }

  if (action.type === 'NEW_ANECDOTE') {
    return state.concat(action.payload)
  }

  return state
}

export default reducer
