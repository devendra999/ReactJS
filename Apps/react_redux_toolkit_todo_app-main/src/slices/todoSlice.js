import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
  todoList: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialStateValue,
  reducers: {
    removeAll: (state) => {
      return initialStateValue
    },
    addTodo: (state, action) => {
      const newItem = {
        id: new Date().getTime().toString(),
        title: action.payload,
        checked: false,
        editing: false,
      }

      state.todoList.push(newItem)

      // return {
      //   ...state,
      //   todoList: [...state.todoList, newItem],
      // }
    },
    deleteTodo: (state, action) => {
      const newTodo = state.todoList.filter(
        (item) => item.id !== action.payload
      )

      state.todoList = newTodo
    },
    editTodoTitle: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              editing: !todo.editing,
              title: action.payload.title,
            }
          }
          return todo
        }),
      }
    },
    toggleEdit: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, editing: !todo.editing }
          }
          return { ...todo, editing: false }
        }),
      }
    },
    checkTodo: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, checked: !todo.checked }
          }
          return todo
        }),
      }
    },
  },
})

export const {
  removeAll,
  addTodo,
  deleteTodo,
  editTodoTitle,
  checkTodo,
  toggleEdit,
} = todoSlice.actions
export default todoSlice.reducer
