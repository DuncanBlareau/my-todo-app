import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Todo } from './models/Todo';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import { getTodos, toggleTodo, addTodo, deleteAllTodos } from './api/todos';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const todosJson = localStorage.getItem('todos');
    if (todosJson) {
      const storedTodos = JSON.parse(todosJson);
      setTodos(storedTodos);
    } else {
      fetchTodos();
    }

    async function fetchTodos() {
      const fetchedTodos = await getTodos();
      if (typeof fetchedTodos === 'string') {
        setError(fetchedTodos);
      } else {
        setTodos(fetchedTodos);
        localStorage.setItem('todos', JSON.stringify(fetchedTodos));
        setError(null); // Réinitialiser l'état d'erreur
      }
    }
  }, []);

  const handleToggleCompleted = async (id: number, completed: boolean) => {
    const errorMessage = await toggleTodo(id, completed);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setError(null); // Réinitialiser l'état d'erreur
    }
  };
  
  const handleAddTodo = async (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    const errorMessage = await addTodo(newTodo);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setTodos([newTodo, ...todos]);
      localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]));
      setError(null); // Réinitialiser l'état d'erreur
    }
  };  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleInput = e.currentTarget.elements.namedItem('title') as HTMLInputElement;
    const descriptionInput = e.currentTarget.elements.namedItem('description') as HTMLInputElement;
    handleAddTodo(titleInput.value, descriptionInput.value);
    titleInput.value = '';
    descriptionInput.value = '';
  };

  const handleDeleteAllTodos = async () => {
    try {
      await deleteAllTodos();
      setTodos([]); // Mettez à jour l'état local des todos
    } catch (error) {
      console.error('Erreur lors de la suppression de tous les todos:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mt-6">
      <nav className="bg-gray-800 p-4 rounded-t-lg">
        <ul className="flex justify-start space-x-4">
          <li>
            <Link className="text-white text-4xl font-bold mb-4" to="/">Mon application Todo</Link>
          </li>
        </ul>
      </nav>
      {error && <div className="bg-red-500 text-white p-4 rounded-md mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-6 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="...Ménage..."
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="...Il faut passer l'aspirateur..."
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md"
        >
          Ajoutez une nouvelle tâche
        </button>
      </form>
      <Routes>
        <Route
          path="/"
          element={<TodoList todos={todos} onToggleCompleted={handleToggleCompleted} onDeleteAllTodo={handleDeleteAllTodos}/>}
          />
        <Route path="/todos/:id" element={<TodoDetails todos={todos} />} />
      </Routes>
    </div>
  );
};

export default App;
     
