import { useState, useEffect } from "react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo !== "") {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="border p-4 bg-gray-900 rounded-md shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] text-[#A4BAD2] ">
      <h1 className="text-3xl font-bold mb-4 text-turquoise-400 shadow-turquoise-400 ">
        Ordo Inquisitorum
      </h1>
      <div className="flex mb-4">
        <input
          className="border border-gray-600 bg-gray-800 text-white px-3 py-2 rounded-md mr-2 focus:outline-none focus:border-blue-500"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new quest"
        />
        <button
          className="bg-[#082E32] hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
          onClick={addTodo}
        >
          Issues Order
        </button>
        <img src="src\assets\colored-Inquisiton.png" className="w-16"></img>
      </div>
          <span>Missions Inquisitores</span>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="mr-2 cursor-pointer"
            />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.text}
            </span>
            <div>

            </div>
            <button
              className="bg-[#082E32] hover:bg-red-600 text-white px-3 py-1 rounded-md ml-auto focus:outline-none"
              onClick={() => removeTodo(todo.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
