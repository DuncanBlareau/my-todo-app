import React, { useState } from 'react';
import TodoList from './components/TodoList';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Apprendre React', completed: false },
    { id: 2, title: 'Créer une application Todo', completed: false },
    { id: 3, title: 'Faire des tests unitaires', completed: false },
  ]);

  return (
    <div>
      <h1>Mon application Todo</h1>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;