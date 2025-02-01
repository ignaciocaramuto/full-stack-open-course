import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

export const AnecdoteList = () => {

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL') {
      return anecdotes
    }

    return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter))
  })
  const dispatch = useDispatch()

  const addVote = (id, content) => {
    dispatch(setNotification(`you voted ${content}`))
    dispatch(vote(id))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  return <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => addVote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
  </div>
}
