import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TodoDetails from '../components/TodoDetails';
import { Todo } from '../models/Todo';

const mockTodos: Todo[] = [
  {
    id: 1,
    title: 'Faire les courses',
    description: 'Acheter des fruits, légumes, et produits d\'épicerie',
    completed: false,
  },
  {
    id: 2,
    title: 'Réparer la porte',
    description: 'La porte du garage doit être réparée',
    completed: false,
  },
];

describe('TodoDetails', () => {
  it('displays the correct todo details based on the URL parameter', () => {
    render(
      <MemoryRouter initialEntries={['/todos/1']}>
        <Routes>
            <Route path="/todos/:id" element={<TodoDetails todos={mockTodos} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Faire les courses/i)).toBeInTheDocument();
    expect(screen.getByText(/Acheter des fruits, légumes, et produits d'épicerie/i)).toBeInTheDocument();
  });
});
