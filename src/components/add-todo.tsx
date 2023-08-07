'use client';
import { useTodos } from '@/store/todos';
import React, { FormEvent, useState } from 'react';

const Addtodo = () => {
	const [todo, setTodo] = useState('');
	const { handleAddTodo } = useTodos();

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleAddTodo(todo);
		setTodo('');
	};
	return (
		<form onSubmit={handleFormSubmit}>
			<input
				type="text"
				placeholder="Enter your todo"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button type="submit">ADD</button>
		</form>
	);
};

export default Addtodo;
