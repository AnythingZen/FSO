import PropTypes from "prop-types";

const DisplayMessage = ({ message }) => {
	const addBlogStyle = {
		color: "green",
		border: "3px solid green",
		borderRadius: "12px",
		padding: "30px 20px",
	};
	const errorStyle = {
		color: "red",
		border: "3px solid red",
		borderRadius: "12px",
		padding: "30px 20px",
	};
	if (!message) {
		return;
	}

	return message.author ? (
		<h2 style={addBlogStyle}>
			{message.title} {message.author} added
		</h2>
	) : (
		<h2 style={errorStyle}>{message}</h2>
	);
};

DisplayMessage.propTypes = {
	message: PropTypes.object,
};

export default DisplayMessage;
