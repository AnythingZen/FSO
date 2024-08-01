import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setNewBlog, setMessage }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleBlogSubmit = async (e) => {
		e.preventDefault();
		const newBlog = {
			title,
			author,
			url,
		};
		try {
			const blogResponse = await blogService.createBlog(newBlog);
			resetState();
			setMessage(() => newBlog);
			setTimeout(() => setMessage(null), 3000);
			setNewBlog((blogs) => blogs.concat(blogResponse));
		} catch (error) {
			setMessage(() => error.response.data.error);
			setTimeout(() => setMessage(null), 3000);
		}
	};
	const resetState = () => {
		setTitle("");
		setAuthor("");
		setUrl("");
	};

	const handleTitle = ({ target }) => {
		setTitle(target.value);
	};

	const handleAuthor = ({ target }) => {
		setAuthor(target.value);
	};

	const handleUrl = ({ target }) => {
		setUrl(target.value);
	};
	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={(e) => handleBlogSubmit(e)}>
				<label>
					title *:{" "}
					<input type="text" value={title} onChange={handleTitle} />
				</label>
				<br />
				<label>
					author :{" "}
					<input
						type="text"
						value={author}
						onChange={handleAuthor}
						required
					/>
				</label>
				<br />
				<label>
					url *:{" "}
					<input type="text" value={url} onChange={handleUrl} />
				</label>
				<br />
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default BlogForm;
