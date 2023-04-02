import React from 'react';
import { useParams } from 'react-router-dom';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoDetailsProps {
  todos: Todo[];
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ todos }) => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Todo introuvable</div>;
  }

  const todoId = parseInt(id, 10);
  const todo = todos.find((t) => t.id === todoId);

  if (!todo) {
    return <div>Todo introuvable</div>;
  }

  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
    </div>
  );
};

export default TodoDetails;
