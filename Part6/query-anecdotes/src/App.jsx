import AnecdoteForm from './components/AnecdoteForm'
import Notification, { useNotification } from './components/Notification'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {

  const { dispatch } = useNotification()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    anecdote.votes++
    updateAnecdoteMutation.mutate(anecdote)
    setNotification(`You voted ${anecdote.content}`)
  }

  const setNotification = (message) => {
    dispatch({ type: "SET_NOTIFICATION", payload: message })
    setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 5000);
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes(),
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  console.log(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
