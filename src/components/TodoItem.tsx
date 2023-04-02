import React from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <li>
      <input type="checkbox" checked={todo.completed} />
      <span>{todo.title}</span>
    </li>
  );
};

export default TodoItem;
