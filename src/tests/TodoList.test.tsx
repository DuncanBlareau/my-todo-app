import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';
import { Todo } from '../models/Todo';
import { BrowserRouter } from 'react-router-dom';

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
  { id: 4, title: 'Test Todo 4', completed: true },
];

const mockOnToggleCompleted = jest.fn();

describe('TodoList', () => {
  it('renders todos', () => {
    render(
      <BrowserRouter>
        <TodoList todos={mockTodos} onToggleCompleted={mockOnToggleCompleted} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 3')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 4')).toBeInTheDocument();
  });

  it('sorts todos correctly', () => {
    render(
      <BrowserRouter>
        <TodoList todos={mockTodos} onToggleCompleted={mockOnToggleCompleted} />
      </BrowserRouter>
    );

    const todoElements = screen.getAllByRole('listitem');

    expect(todoElements[0]).toHaveTextContent('Test Todo 1');
    expect(todoElements[1]).toHaveTextContent('Test Todo 3');
    expect(todoElements[2]).toHaveTextContent('Test Todo 2');
    expect(todoElements[3]).toHaveTextContent('Test Todo 4');
  });

  it('renders the correct number of todos', () => {
    render(
      <BrowserRouter>
        <TodoList todos={mockTodos} onToggleCompleted={mockOnToggleCompleted} />
      </BrowserRouter>
    );
  
    const todoElements = screen.getAllByRole('listitem');
    expect(todoElements.length).toEqual(mockTodos.length);
  });

  it('calls onToggleCompleted with the correct values when a todo is toggled', () => {
    render(
      <BrowserRouter>
        <TodoList todos={mockTodos} onToggleCompleted={mockOnToggleCompleted} />
      </BrowserRouter>
    );  
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(mockOnToggleCompleted).toHaveBeenCalledWith(1, true);
  
    fireEvent.click(checkboxes[1]);
    expect(mockOnToggleCompleted).toHaveBeenCalledWith(3, true);
  
    fireEvent.click(checkboxes[2]);
    expect(mockOnToggleCompleted).toHaveBeenCalledWith(2, false);
  
    fireEvent.click(checkboxes[3]);
    expect(mockOnToggleCompleted).toHaveBeenCalledWith(4, false);
  });
});
