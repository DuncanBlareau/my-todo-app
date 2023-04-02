import React from 'react';
import { Todo } from '../models/Todo';
import { Link } from 'react-router-dom';

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleCompleted }) => {
  const handleToggleCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCompleted(todo.id, event.target.checked);
  };

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={handleToggleCompleted} />
      <Link to={`/todos/${todo.id}`} style={todo.completed ? { textDecoration: 'line-through' } : {}}>
        {todo.title}
      </Link>
    </li>
  );
};

export default TodoItem;
