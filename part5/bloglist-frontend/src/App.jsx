import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import LogoutButton from "./components/LogoutButton";
import DisplayMessage from "./components/DisplayMessage";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState("");
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedInBlogUser");

		if (loggedUserJSON) {
			setIsLoggedIn(true);
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
			setUsername(() => user.username);
			setUser(user);
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
		setIsLoggedIn(false);
		window.localStorage.removeItem("loggedInBlogUser");
		setUsername("");
		setPassword("");
		setMessage(null);
	};

	const storeDetails = (loginResponse) => {
		setUser(loginResponse);
		window.localStorage.setItem(
			"loggedInBlogUser",
			JSON.stringify(loginResponse)
		);
		blogService.setToken(loginResponse.token);
	};

	return (
		<>
			{isLoggedIn ? (
				<div>
					<h1>Blogs</h1>
					<DisplayMessage message={message} />
					<h3>
						{user.name} logged in{" "}
						<LogoutButton handleLogout={handleLogout} />
					</h3>
					<BlogForm setNewBlog={setBlogs} setMessage={setMessage} />
					<Blog blog={blogs} />
				</div>
			) : (
				<div>
					<h1>Log into application</h1>
					<DisplayMessage message={message} />
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
