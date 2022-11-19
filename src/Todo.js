import React from 'react'

const Todo = ({ todo, toggleTodo }) => {
  
  function handleTodoClick(){
    toggleTodo(todo.id)
  }
  return (
    <div>
        <input id="input" type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
        <label>
            {todo.name}     
        </label>
    </div>
  )
}

export default Todo