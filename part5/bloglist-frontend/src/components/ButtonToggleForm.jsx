import { useState } from "react";
import BlogForm from "./BlogForm";
import PropTypes from "prop-types";

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

BlogForm.propTypes = {
	setBlogs: PropTypes.func.isRequired,
	setMessage: PropTypes.func.isRequired,
};

export default ButtonToggleForm;
