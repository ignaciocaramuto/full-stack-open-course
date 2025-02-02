import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { notification } from "../reducers/notificationReducer"

export const AnecdoteList = () => {

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL') {
      return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }

    return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter))
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(notification(`you voted ${anecdote.content}`, 5))
  }

  return <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </div>
}
