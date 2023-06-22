import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeAll, addTodo } from './slices/todoSlice'
import { showAlert } from './slices/alertSlice'
import List from './Components/List'
import Alert from './Components/Alert'
import ThemeToggle from './Components/ThemeToggle'

function App() {
  const [name, setName] = useState('')

  const dispatch = useDispatch()
  const todoList = useSelector((state) => state.todos.todoList)
  const alert = useSelector((state) => state.alerts)
  const isDarkTheme = useSelector((state) => state.themes.darkTheme)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      dispatch(
        showAlert({
          type: 'danger',
          title: 'Please enter a value',
        })
      )
    } else {
      dispatch(addTodo(name))
      dispatch(
        showAlert({
          type: 'success',
          title: 'Item added to the list',
        })
      )
      setName('')
    }
  }

  const removeItems = () => {
    dispatch(removeAll())
    dispatch(
      showAlert({
        type: 'danger',
        title: 'All Items removed',
      })
    )
  }

  return (
    <div className='app' data-theme={`${isDarkTheme ? 'dark' : 'light'}`}>
      <div className='content'>
        <ThemeToggle />
        <section className='todo-wrapper'>
          {alert.isVisible && <Alert />}
          <div className='todo-container'>
            <div className='todo-top'>
              <h1 className='todo-title'>Todo List</h1>
              {todoList.length > 0 && (
                <div className='todo-count'>{todoList.length} items</div>
              )}
            </div>
            <form className='todo-form' onSubmit={handleSubmit}>
              <div className='todo-form-input'>
                <input
                  type='text'
                  value={name}
                  placeholder='enter something...'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button>Add</button>
            </form>
            <List />
            {todoList.length > 1 && (
              <div className='todo-button-group'>
                <button
                  type='button'
                  className='remove-btn'
                  onClick={removeItems}
                >
                  Remove all
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
