import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
// import uuidv4 from "uuidv4/build/lib"
import { v4 as uuid} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(prevTodos => [...prevTodos, ...storedTodos])
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleAddTodo = (e) =>{
    const name = todoNameRef.current.value
    if (name === "") return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuid(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo} type="button">Add Todo</button>
      <button onClick={handleClearTodos} type="button">Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left todo</div>
    </>
  );
}

export default App;
