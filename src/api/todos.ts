import { Todo } from '../models/Todo';

const API_URL = 'http://localhost:3000';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);
  const todos = await response.json();
  return todos;
}

export async function toggleTodo(id: number, completed: boolean): Promise<void> {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
}

export async function addTodo(todo: Todo): Promise<void> {
  await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
}
