import { Todo } from '../models/Todo';

const API_URL = 'http://localhost:3000';

export async function getTodos(): Promise<Todo[] | string> {
  try {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const todos = await response.json();
    return todos;
  } catch (error) {
    return `Erreur lors de la mise à jour du Todo : ${(error as Error).message}`;
  }
}


export async function toggleTodo(id: number, completed: boolean): Promise<void | string> {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
  } catch (error) {
    return `Erreur lors de la mise à jour du Todo : ${(error as Error).message}`;
  }
}

export async function addTodo(todo: Todo): Promise<void | string> {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
  } catch (error) {
    return `Erreur lors de la mise à jour du Todo : ${(error as Error).message}`;
  }
}

