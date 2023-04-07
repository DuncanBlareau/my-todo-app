import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import * as todosApi from './api/todos';
import { Todo } from './models/Todo';

jest.mock('./api/todos');

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

describe('App', () => {
  beforeEach(() => {
    (todosApi.getTodos as jest.Mock).mockResolvedValue(mockTodos);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays todos', async () => {
    render(<App />, { wrapper: MemoryRouter });

    expect(await screen.findByText('Faire les courses')).toBeInTheDocument();
    expect(screen.getByText('Réparer la porte')).toBeInTheDocument();
  });

  it('navigates to the TodoDetails page when a todo is clicked', async () => {
    render(<App />, { wrapper: MemoryRouter });

    fireEvent.click(await screen.findByText('Faire les courses'));

    expect(screen.getByText('Faire les courses')).toBeInTheDocument();
    expect(screen.getByText('Description: Acheter des fruits, légumes, et produits d\'épicerie')).toBeInTheDocument();
  });

  it('adds a new todo and displays it', async () => {
    render(<App />, { wrapper: MemoryRouter });

    const titleInput = screen.getByPlaceholderText('Titre') as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Nouvelle tâche' } });

    const descriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
    fireEvent.change(descriptionInput, { target: { value: 'Détails de la nouvelle tâche' } });
    fireEvent.click(screen.getByText('Ajouter un todo'));

    // Attendez que la fonction addTodo soit appelée
    await waitFor(() => expect(todosApi.addTodo).toHaveBeenCalled());
    // Vérifiez que le localStorage contient le nouveau todo
    const storedTodos = JSON.parse(localStorage.getItem('todos') as string);
    const newTodoExists = storedTodos.some((todo: Todo) => todo.title === 'Nouvelle tâche');
    expect(newTodoExists).toBe(true);

    // Attendez que le nouveau todo apparaisse dans le DOM
    await screen.findByText('Nouvelle tâche');

    fireEvent.click(screen.getByText('Nouvelle tâche'));
    expect(screen.getByText(/Détails de la nouvelle tâche/)).toBeInTheDocument();

  });
});
