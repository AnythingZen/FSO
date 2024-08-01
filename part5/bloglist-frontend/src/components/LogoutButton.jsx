const LogoutButton = ({ handleLogout }) => {
	return (
		<button type="button" onClick={handleLogout}>
			Logout
		</button>
	);
};

export default LogoutButton;
