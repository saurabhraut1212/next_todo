'use client';

import { useTodos } from '@/store/todos';
import { useSearchParams } from 'next/navigation';

const Todos = () => {
	const { todos, toggleTodoAsCompleted, deleteHandler } = useTodos();
	const searchParams = useSearchParams();
	const todosFilter = searchParams.get('todos');
	let filtered = todos;
	if (todosFilter === 'active') {
		filtered = filtered.filter((todo) => !todo.completed);
	} else if (todosFilter === 'completed') {
		filtered = filtered.filter((todo) => todo.completed);
	}
	return (
		<ul>
			{filtered.map((todo) => {
				return (
					<li key={todo.id}>
						<input
							type="checkbox"
							name=""
							id={`todo-${todo.id}`}
							checked={todo.completed}
							onChange={() => toggleTodoAsCompleted(todo.id)}
						/>

						<label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
						{todo.completed && (
							<button type={'button'} onClick={() => deleteHandler(todo.id)}>
								Delete
							</button>
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default Todos;
