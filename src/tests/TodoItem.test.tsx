import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoItem from '../components/TodoItem';
import { Todo } from '../models/Todo';
import { BrowserRouter } from 'react-router-dom';

const mockTodo: Todo = {
    id: 1,
    title: 'Example Todo',
    completed: true,
  };

const mockOnToggleCompleted = jest.fn();

describe('TodoItem', () => {
    it('renders the todo title', () => {
        render(<BrowserRouter><TodoItem todo={mockTodo} onToggleCompleted={mockOnToggleCompleted} /></BrowserRouter>);
        expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    });

    it('renders with line-through style when completed', () => {
        const completedTodo = { ...mockTodo, completed: true };
        render(<BrowserRouter><TodoItem todo={mockTodo} onToggleCompleted={mockOnToggleCompleted} /></BrowserRouter>);
        const linkElement = screen.getByRole('link', { name: completedTodo.title });
        expect(linkElement).toHaveStyle('text-decoration: line-through');
    });

    it('calls onToggleCompleted with the correct values when the checkbox is toggled', () => {
        render(<BrowserRouter><TodoItem todo={mockTodo} onToggleCompleted={mockOnToggleCompleted} /></BrowserRouter>);
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeChecked()
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked()
      });
      
      it('renders the correct link for the todo', () => {
        render(<BrowserRouter><TodoItem todo={mockTodo} onToggleCompleted={mockOnToggleCompleted} /></BrowserRouter>);
        const linkElement = screen.getByRole('link', { name: mockTodo.title });
        expect(linkElement.getAttribute('href')).toEqual(`/todos/${mockTodo.id}`);
      });
});
