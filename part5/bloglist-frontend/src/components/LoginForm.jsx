import PropTypes from "prop-types";

const LoginForm = ({
	username,
	handleUsername,
	password,
	handlePassword,
	handleSubmit,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username*{" "}
				<input
					type="text"
					value={username}
					onChange={handleUsername}
					required
				/>
			</label>
			<br />
			<label>
				Password*{" "}
				<input
					type="password"
					value={password}
					onChange={handlePassword}
					required
				/>
			</label>
			<br />
			<button type="submit">Login</button>
		</form>
	);
};

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	handleUsername: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
	handlePassword: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
