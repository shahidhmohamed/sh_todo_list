import React, { useState } from "react";
import axios from "axios";
import { Todo } from "../types/todo"; // Adjust the import path based on your project structure

interface AddTodoFormProps {
  onSubmit: (newTodo: Todo) => void;
}

export default function AddTodoForm({ onSubmit }: AddTodoFormProps) {
  const [input, setInput] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    try {
      const response = await axios.post("http://localhost:5000/todos", {
        title: input,
      });
      onSubmit(response.data);
      setInput("");
    } catch (error) {
      console.error("There was an error creating the todo!", error);
    }
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        className="rounded-s-md grow border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-800"
      >
        Add
      </button>
    </form>
  );
}
