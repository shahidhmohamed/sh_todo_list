import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onCompletedChange: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos,
  onCompletedChange,
  onDelete,
}: TodoListProps) {
  const todoSorted = todos.sort((a, b) => {
    if (a.completed === b.completed) {
      return b._id > a._id ? 1 : -1;
    }
    return a.completed ? 1 : -1;
  });

  return (
    <>
      <div className="space-y-2">
        {todoSorted.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onCompletedChange={onCompletedChange}
            onDelete={onDelete}
          />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-center text-sm text-gray-500">
          No todos yet. Add a new one above.
        </p>
      )}
    </>
  );
}
