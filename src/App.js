import { useState, useRef } from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";

function App() {

  // todosはオブジェクト useStateはtodosを監視し、更新された場合のみ画面を再レンダリングする
  // setTodosはtodosを操作する
  const [todos, setTodos] = useState([]);

  //入力された値を取得できる
  const todoNameRef = useRef();
  const handleAddTodo = () => {
    //タスクを追加する
    const name = todoNameRef.current.value;
    if (!name) return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }]
    })
    todoNameRef.current.value = null;
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <div className="container mt-4">
      <div class="row justify-content-start">
        <h1>ToDoList</h1>
        <input type="text" ref={todoNameRef} />
        <span className="d-grid d-md-flex justify-content-md-end mt-3">
          <button className="btn btn-primary btn-sm" onClick={handleAddTodo}>追加</button>
          <button className="btn btn-danger btn-sm" onClick={handleClear}>削除</button>
        </span>
        <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
        <ToDoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </div>
  );
}

export default App;
