import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [message, setMessage] = useState(null);

	let token;

	const handleUsername = ({ target }) => {
		setUsername(() => target.value);
	};

	const handlePassword = ({ target }) => {
		setPassword(() => target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const loginDetails = {
			username,
			password,
		};
		loginService
			.login(loginDetails)
			.then((response) => (token = response.token))
			.catch((error) => setMessage(error.message));

		setIsLoggedIn(true);
		getUserBlogs();
		setMessage(`${username} has successfully login`);
		setTimeout(() => setMessage(null), 5000);
	};

	const getUserBlogs = async () => {
		const allData = await blogService.getAll();
		const userBlogs = allData
			.filter((blog) => blog.user.username.includes(username))
			.map((blog) => ({
				title: blog.title,
				author: blog.author,
			}));
		setBlogs(() => userBlogs);
	};

	return (
		<>
			{isLoggedIn ? (
				<div>
					<h2>Blogs</h2>
					<h3>{message}</h3>
					<Blog blog={blogs} />
				</div>
			) : (
				<div>
					<h2>Log into application</h2>
					<LoginForm
						username={username}
						handleUsername={handleUsername}
						password={password}
						handlePassword={handlePassword}
						handleSubmit={handleSubmit}
					/>
				</div>
			)}
		</>
	);
};

export default App;
