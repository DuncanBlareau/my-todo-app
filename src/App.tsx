import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Todo } from './models/Todo';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import { getTodos, toggleTodo, addTodo } from './api/todos';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    }
    fetchTodos();
  }, []);

  const handleToggleCompleted = async (id: number, completed: boolean) => {
    await toggleTodo(id, completed);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleAddTodo = async (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    await addTodo(newTodo);
    setTodos([newTodo, ...todos]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleInput = e.currentTarget.elements.namedItem('title') as HTMLInputElement;
    const descriptionInput = e.currentTarget.elements.namedItem('description') as HTMLInputElement;
    handleAddTodo(titleInput.value, descriptionInput.value);
    titleInput.value = '';
    descriptionInput.value = '';
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <h1>Mon application Todo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="title" placeholder="Titre" required />
        </label>
        <label>
          <input type="text" name="description" placeholder="Description" />
        </label>
        <button type="submit">Ajouter un todo</button>
      </form>
      <Routes>
        <Route
          path="/"
          element={<TodoList todos={todos} onToggleCompleted={handleToggleCompleted} />}
          />
        <Route path="/todos/:id" element={<TodoDetails todos={todos} />} />
      </Routes>
    </div>
  );
};

export default App;
     
