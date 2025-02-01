import filterSlice from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterSlice
  }
})

export default store

