import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote, updateAnecdote } from "../requests"
import { useNotification } from "./Notification"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`Added ${anecdote.content}`)
    },
    onError: (error) => {
      setNotification(error.response.data.error)
    }
  })

  const setNotification = (message) => {
    dispatch({ type: "SET_NOTIFICATION", payload: message })
    setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 5000);
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
