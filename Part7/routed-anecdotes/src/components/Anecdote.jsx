export const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <span>Has {anecdote.votes} votes</span>
    </div>
  )
}
