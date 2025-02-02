import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    }
  }
})


export const notification = (message, seconds) => {
  return dispatch => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, seconds * 1000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
