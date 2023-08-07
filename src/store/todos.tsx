'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

export type Todo = {
	id: string;
	task: string;
	completed: boolean;
	createdAt: Date;
};

export type TodoContext = {
	todos: Todo[];
	handleAddTodo: (task: string) => void;
	toggleTodoAsCompleted: (id: string) => void;
	deleteHandler: (id: string) => void;
};

export const todosContext = createContext<TodoContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
	const [todos, setTodos] = useState<Todo[]>(() => {
		const newTodos = localStorage.getItem('todos') || '[]';
		return JSON.parse(newTodos) as Todo[];
	});

	//add todo
	const handleAddTodo = (task: string): void => {
		setTodos((prev) => {
			const newTodos: Todo[] = [
				{
					id: Math.random().toString(),
					task,
					completed: false,
					createdAt: new Date(),
				},
				...prev,
			];
			localStorage.setItem('todos', JSON.stringify(newTodos));
			return newTodos;
		});
	};

	//When task is completed
	const toggleTodoAsCompleted = (id: string) => {
		setTodos((prev) => {
			const newTodos = prev.map((task) => {
				if (task.id === id) {
					return { ...task, completed: !task.completed };
				}
				return task;
			});
			localStorage.setItem('todos', JSON.stringify(newTodos));
			return newTodos;
		});
	};

	//when task is deleted
	const deleteHandler = (id: string) => {
		setTodos((prev) => {
			const newTodos = prev.filter((task) => task.id !== id);
			localStorage.setItem('todos', JSON.stringify(newTodos));
			return newTodos;
		});
	};
	return (
		<todosContext.Provider
			value={{ todos, handleAddTodo, toggleTodoAsCompleted, deleteHandler }}
		>
			{children}
		</todosContext.Provider>
	);
};

//context api

export function useTodos() {
	const todosContextValue = useContext(todosContext);
	if (!todosContextValue) {
		throw new Error('Usetodo is used outside the provider');
	}
	return todosContextValue;
}
