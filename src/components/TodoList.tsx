import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../models/Todo';
import { TrashIcon } from '@heroicons/react/24/solid';

interface TodoListProps {
  todos: Todo[];
  onToggleCompleted: (id: number, completed: boolean) => void;
  onDeleteAllTodo?: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleCompleted, onDeleteAllTodo }) => {
  const sortedTodos = [...todos].sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  return (
    <div className="bg-white shadow-md rounded-lg px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Liste des tâches</h2>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onDeleteAllTodo}
        >
          <TrashIcon title="Supprimez toutes les tâches" className="w-6 h-6" />
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {
        todos.length === 0 ? (
          <div className="text-center">
            <img
              src="/empty-todo-list.svg"
              alt="Empty todo list illustration"
              className="w-full max-w-xs mx-auto mb-4"
            />
            <p className="text-gray-500">Aucune tâche pour le moment. Ajoutez-en une !</p>
          </div>
        ) : (sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggleCompleted={onToggleCompleted} />
        )))}
      </ul>
    </div>
  );
};

export default TodoList;
