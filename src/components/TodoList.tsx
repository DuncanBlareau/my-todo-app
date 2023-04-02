import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleCompleted: (id: number, completed: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleCompleted }) => {
  const sortedTodos = todos.sort((a, b) => (a.completed ? 1 : -1));

  return (
    <div>
      <h2>Liste des tâches</h2>
      <ul>
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggleCompleted={onToggleCompleted} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
