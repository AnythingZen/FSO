import { useState } from "react";
import BlogForm from "./BlogForm";

const ButtonToggleForm = ({ setBlogs, setMessage }) => {
	const [toggleForm, setToggleForm] = useState(false);
	const openForm = () => {
		setToggleForm(!toggleForm);
	};
	return (
		<>
			{toggleForm ? (
				<BlogForm
					setNewBlog={setBlogs}
					setMessage={setMessage}
					cancelForm={setToggleForm}
				/>
			) : (
				<button type="button" onClick={openForm}>
					New Blog
				</button>
			)}
		</>
	);
};

export default ButtonToggleForm;
