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

export default LoginForm;
