import React from 'react';
import Addtodo from '@/components/add-todo';
import Todos from '@/components/todos';
import Navbar from '@/components/navbar';
import './globals.css';
import { RiTodoLine } from 'react-icons/ri';

const MainPage = () => {
	return (
		<main>
			<h2>
				<RiTodoLine className="icons" />
				TODO NEXT+TYPESCRIPT
				<RiTodoLine className="icons" />
			</h2>
			<Navbar />
			<Addtodo />
			<Todos />
		</main>
	);
};

export default MainPage;
