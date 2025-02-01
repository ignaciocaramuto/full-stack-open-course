import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

export const AnecdoteList = () => {

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL') {
      return anecdotes
    }

    return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter))
  })
  const dispatch = useDispatch()

  const addVote = (id) => {
    dispatch(vote(id))
  }

  return <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => addVote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
  </div>
}
