import { useEffect, useState } from "react";
import axios from "axios";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("There was an error fetching the todos!", error);
      }
    }
    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleCompletedChange = async (id: string, completed: boolean) => {
    try {
      const response = await axios.patch(`http://localhost:5000/todos/${id}`, {
        completed,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("There was an error updating the todo!", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("There was an error deleting the todo!", error);
    }
  };

  return (
    <div className="py-10 h-screen space-y-5 overflow-y-auto">
      <h1 className="font-bold text-3xl text-center">My Todos</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={handleAddTodo} />
        <TodoList
          todos={todos}
          onCompletedChange={handleCompletedChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
