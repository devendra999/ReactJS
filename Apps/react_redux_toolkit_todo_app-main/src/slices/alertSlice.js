import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
  isVisible: false,
  type: '', // classess: success, danger
  title: '',
}

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialStateValue,
  reducers: {
    showAlert: (state, action) => {
      return {
        ...state,
        isVisible: true,
        ...action.payload,
      }
    },
    hideAlert: (state, action) => {
      return initialStateValue
    },
  },
})

export const { showAlert, hideAlert } = alertSlice.actions
export default alertSlice.reducer
