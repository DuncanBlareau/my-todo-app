import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Todo } from '../models/Todo';

interface TodoDetailsProps {
  todos: Todo[];
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ todos }) => {
  const { id } = useParams<{ id: string }>();
  const todoId = parseInt(id as string, 10);
  const todo = todos.find((t) => t.id === todoId);

  if (!todo) {
    return <div className="text-center">
              <img
                src="/todo_not_found.svg"
                alt="Todo not found illustration"
                className="w-full max-w-xs mx-auto mb-4"
              />
              <p className="text-gray-500">Tâche introuvable !</p>
            </div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{todo.title}</h2>
      {todo.description && (
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Description:</span> {todo.description}
        </p>
      )}
      <p className="text-gray-700 mb-6">
        <span className="font-semibold">État:</span>{" "}
        {todo.completed ? (
          <span className="text-green-500">Terminé</span>
        ) : (
          <span className="text-yellow-500">En cours</span>
        )}
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
      >
        Retour à la liste
      </Link>
    </div>

  );
};

export default TodoDetails;
