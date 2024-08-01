import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [message, setMessage] = useState(null);

	let token;

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedInBlogUser");

		if (loggedUserJSON) {
			setIsLoggedIn(true);
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
			setUsername(() => user.username);
			getUserBlogs();
		}
	}, []);

	const handleUsername = ({ target }) => {
		setUsername(() => target.value);
	};

	const handlePassword = ({ target }) => {
		setPassword(() => target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const loginDetails = {
			username,
			password,
		};
		try {
			const loginResponse = await loginService.login(loginDetails);

			storeDetails(loginResponse);
			setIsLoggedIn(true);
			getUserBlogs();
			setMessage(`${loginResponse.name} has successfully login`);
		} catch (error) {
			setMessage(() => error.response.data.error);
			setTimeout(() => setMessage(null), 3000);
		}
	};

	const getUserBlogs = async () => {
		const allData = await blogService.getAll();
		const userBlogs = allData
			.filter((blog) => blog.user.username.includes(username))
			.map((blog) => ({
				title: blog.title,
				author: blog.author,
				id: blog.id,
			}));
		setBlogs(() => userBlogs);
	};

	const handleLogout = () => {
		setIsLoggedIn(false)
		window.localStorage.removeItem("loggedInBlogUser");
		setUsername('')
		setPassword('')
		setMessage(null)
	};

	const storeDetails = (loginResponse) => {
		window.localStorage.setItem(
			"loggedInBlogUser",
			JSON.stringify(loginResponse)
		);
		token = blogService.setToken(loginResponse.token);
	};

	return (
		<>
			{isLoggedIn ? (
				<div>
					<h2>Blogs</h2>
					<h3>{message}</h3>
					<LogoutButton handleLogout={handleLogout} />
					<Blog blog={blogs} />
				</div>
			) : (
				<div>
					<h2>log into application</h2>
					<LoginForm
						username={username}
						handleUsername={handleUsername}
						password={password}
						handlePassword={handlePassword}
						handleSubmit={handleSubmit}
					/>
					<h2>{message}</h2>
				</div>
			)}
		</>
	);
};



export default App;
