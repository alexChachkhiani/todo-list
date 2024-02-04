import React, { useState } from 'react'

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("")

    const handleSubmit = event => {
        event.preventDefault()

        addTodo(value)

        setValue("")
    }
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" className="todo-input" value={value} placeholder="What is the task today?" onChange={(event) => setValue(event.target.value)}/>
        <button type="submit" className="todo-btn">Add Task</button>
    </form>
  )
}
