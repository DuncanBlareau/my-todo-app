import { getTodos, toggleTodo, addTodo } from '../api/todos';
import { Todo } from '../models/Todo';

const API_URL = '/todos';

describe('todos API', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getTodos retrieves todos successfully', async () => {
    // Arrange
    const mockTodos: Todo[] = [
        {
            id: 1,
            title: 'Test Todo 1',
            description: 'Test Todo 1 description',
            completed: false,
          },
          {
            id: 2,
            title: 'Test Todo 2',
            description: 'Test Todo 2 description',
            completed: true,
          },
          { id: 3, title: 'Test Todo 3', completed: false },
    ];
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    } as Response);

    // Act
    const todos = await getTodos();

    // Assert
    expect(todos).toEqual(mockTodos);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}`);
  });

  test('toggleTodo updates todo status successfully', async () => {
    // Arrange
    const todoId = 1;
    const completed = true;
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
    } as Response);

    // Act
    const error = await toggleTodo(todoId, completed);

    // Assert
    expect(error).toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
  });

  test('addTodo adds a new todo successfully', async () => {
    // Arrange
    const newTodo: Todo = {
        id: 1,
        title: 'Example Todo',
        completed: true,
    };
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
    } as Response);

    // Act
    const error = await addTodo(newTodo);

    // Assert
    expect(error).toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
  });

  // Tests pour les cas d'erreur.
  test('getTodos handles error when fetching todos', async () => {
    // Arrange
    const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Failed to fetch'));

    // Act
    const result = await getTodos();

    // Assert
    expect(result).toBe('Erreur lors de la mise à jour du Todo : Failed to fetch');
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}`);
  });

  test('toggleTodo handles error when updating todo status', async () => {
    // Arrange
    const todoId = 1;
    const completed = true;
    const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Failed to update'));

    // Act
    const error = await toggleTodo(todoId, completed);

    // Assert
    expect(error).toBe('Erreur lors de la mise à jour du Todo : Failed to update');
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
  });

  test('addTodo handles error when adding a new todo', async () => {
    // Arrange
    const newTodo: Todo = {
        id: 1,
        title: 'Example Todo',
        completed: true,
    };
    const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Failed to add'));

    // Act
    const error = await addTodo(newTodo);

    // Assert
    expect(error).toBe('Erreur lors de la mise à jour du Todo : Failed to add');
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
  });
});
