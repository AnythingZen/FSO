import PropTypes from "prop-types";

const LogoutButton = ({ handleLogout }) => {
	return (
		<button type="button" onClick={handleLogout}>
			Logout
		</button>
	);
};

LogoutButton.propTypes = {
	handleLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
