import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Search'
import { BsCircle, BsCheckCircle, BsTrash } from "react-icons/bs"

function Home() {
  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    axios.get("http://localhost:3001/todos")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // ✅ Toggle Complete Function
  const handleToggle = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(result => {
        // Update the local list immediately
        setTodos(prev =>
          prev.map(todo =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch(err => console.log(err))
  }

  // 🗑️ Delete Todo
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => setTodos(prev => prev.filter(todo => todo._id !== id)))
      .catch(err => console.log(err))
  }

  return (
    <div className='home'>
      <h2>TO-Do List</h2>
      <Search onAdd={fetchTodos} />
      {
        todos.length === 0 
        ? <h3>No To-Dos</h3>
        : todos.map(todo => (
            <div className='checkbox' key={todo._id}>
              {todo.done ? (
                <BsCheckCircle
                  className='icon checked'
                  onClick={() => handleToggle(todo._id)}
                />
              ) : (
                <BsCircle
                  className='icon'
                  onClick={() => handleToggle(todo._id)}
                />
              )}
              <p className={todo.done ? 'completed' : ''}>{todo.task}</p>
              <BsTrash className='delete-icon' onClick={() => handleDelete(todo._id)} />
            </div>
          ))
      }
    </div>
  )
}

export default Home
