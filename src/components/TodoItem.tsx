import React, { useState } from 'react';
import { Todo } from '../models/Todo';
import { Link } from 'react-router-dom';

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
    <li>
      <input type="checkbox" checked={checked} onChange={handleToggleCompleted} />
      <Link to={`/todos/${todo.id}`} style={checked ? { textDecoration: 'line-through' } : {}}>
        {todo.title}
      </Link>
    </li>
  );
};

export default TodoItem;
