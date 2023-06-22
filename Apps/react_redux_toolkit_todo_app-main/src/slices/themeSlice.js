import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
  darkTheme: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialStateValue,
  reducers: {
    toggleTheme: (state, action) => {
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
