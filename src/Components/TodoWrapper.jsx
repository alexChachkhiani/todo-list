import React, { useEffect, useState } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import { v4 as uuidv4 } from 'uuid'
import { EditTodoForm } from './EditTodoForm'
uuidv4()

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = todo => {
      if (todo.trim() !== "") {
        setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
      }
    }

    const toggleComplete = id => {
      setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo ))
    }

    const deleteTodo = id => {
      setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = id => {
      setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id) => {
      setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
    }

    const [time, setTime] = useState(new Date())

    useEffect(() => {
      setInterval(() => setTime(new Date()), 1000)
    }, [])

    let minutes = time.getMinutes();
    if (minutes < 10) {
      return "0" + minutes
    }
  return (
    <div className="todo-wrapper">
        <header>
          <h1>Get Things Done!</h1>
          <h1 className="current-time">{time.getHours()}:{minutes}</h1>
        </header>
        <TodoForm addTodo={addTodo}/>
        {todos.map((todo, index) => (
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
          )
        ))}
    </div>
  )
}
