import React, { useState } from 'react';
import { Todo } from '../models/Todo';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleCompleted }) => {
  const [checked, setChecked] = useState(todo.completed);
  const handleToggleCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onToggleCompleted(todo.id, event.target.checked);
  };

  return (
    <li className="bg-white p-4 hover:bg-gray-100 transition-colors duration-200 ease-in-out rounded-lg shadow-md p-4 mb-2 flex items-center">
      <input type="checkbox" checked={checked} onChange={handleToggleCompleted} className="mr-2 form-checkbox text-blue-500"/>
      <Link to={`/todos/${todo.id}`} className="text-blue-500 hover:text-blue-700 flex items-center" style={checked ? { textDecoration: 'line-through' } : {}}>
        {checked ? (
          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
        ) : (
          <ExclamationCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
        )}
        <span className="text-lg font-semibold">{todo.title}</span>
      </Link>
    </li>
  );
};

export default TodoItem;
