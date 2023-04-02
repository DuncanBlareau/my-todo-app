import React from 'react';
import { useParams } from 'react-router-dom';
import { Todo } from '../models/Todo';

interface TodoDetailsProps {
  todos: Todo[];
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ todos }) => {
  const { id } = useParams<{ id: string }>();
  const todoId = parseInt(id as string, 10);
  const todo = todos.find((t) => t.id === todoId);

  if (!todo) {
    return <div>Todo introuvable</div>;
  }

  return (
    <div>
      <h2>{todo.title}</h2>
      {todo.description && <p>Description: {todo.description}</p>}
      <p>État: {todo.completed ? 'Terminé' : 'En cours'}</p>
    </div>
  );
};

export default TodoDetails;
