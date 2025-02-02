import { AnecdoteList } from './components/AnecdoteList'
import { AnecdoteForm } from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes.js'
import { setAnecdotes } from './reducers/anecdoteReducer.js'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)))
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
