import React from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
  onSelectTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleCompleted, onSelectTodo }) => {
  const handleChange = () => {
    onToggleCompleted(todo.id, !todo.completed);
  };

  const handleClick = () => {
    onSelectTodo(todo.id);
  };

  const textStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
  };

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={handleChange} />
      <span style={textStyle} onClick={handleClick}>
        {todo.title}
      </span>
    </li>
  );
};

export default TodoItem;
