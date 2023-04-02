import React from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleCompleted }) => {
  const handleChange = () => {
    onToggleCompleted(todo.id, !todo.completed);
  };

  const textStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
  };

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={handleChange} />
      <span style={textStyle}>{todo.title}</span>
    </li>
  );
};

export default TodoItem;
