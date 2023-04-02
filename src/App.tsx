import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Apprendre React', description: 'Se familiariser avec React et ses concepts', completed: false },
    { id: 2, title: 'Créer une application Todo', description: 'Développer une application Todo en utilisant React', completed: false },
    { id: 3, title: 'Faire des tests unitaires', description: 'Écrire des tests unitaires pour garantir la qualité du code', completed: false },
  ]);
  const navigate = useNavigate();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const handleToggleCompleted = (id: number, completed: boolean) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed,
            }
          : todo
      )
    );
  };

  const handleSelectTodo = (id: number) => {
    navigate(`/todo/${id}`);
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: Date.now(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setNewTodoTitle('');
    setNewTodoDescription('');
  };

  return (
    
      <div>
        <h1>Mon application Todo</h1>
        <form onSubmit={handleAddTodo}>
        <label>
          Titre:
          <input type="text" value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={newTodoDescription} onChange={(e) => setNewTodoDescription(e.target.value)} />
        </label>
        <button type="submit">Ajouter</button>
      </form>
        <Routes>
          <Route path="/" element={<TodoList todos={todos} onToggleCompleted={handleToggleCompleted} onSelectTodo={handleSelectTodo} />}/>
          <Route path="/todo/:id" element={<TodoDetails todos={todos} />}/>
        </Routes>
      </div>
  
  );
};

export default App;
