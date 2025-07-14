import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders todo list title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Lista de Tareas/i);
  expect(titleElement).toBeInTheDocument();
});

test('adds a new task', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Agregar nueva tarea/i);
  const button = screen.getByText(/Agregar/i);
  
  fireEvent.change(input, { target: { value: 'Nueva tarea' } });
  fireEvent.click(button);
  
  expect(screen.getByText('Nueva tarea')).toBeInTheDocument();
});

test('toggles task completion', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Agregar nueva tarea/i);
  const addButton = screen.getByText(/Agregar/i);
  
  fireEvent.change(input, { target: { value: 'Tarea de prueba' } });
  fireEvent.click(addButton);
  
  const checkButton = screen.getByRole('button', { name: '' });
  fireEvent.click(checkButton);
  
  const taskItem = screen.getByText('Tarea de prueba').closest('li');
  expect(taskItem).toHaveClass('completada');
});
