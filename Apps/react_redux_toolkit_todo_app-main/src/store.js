import { configureStore } from '@reduxjs/toolkit'
import todoslice from './slices/todoSlice'
import alertSlice from './slices/alertSlice'
import themeSlice from './slices/themeSlice'

export default configureStore({
  reducer: {
    todos: todoslice,
    alerts: alertSlice,
    themes: themeSlice,
  },
})
