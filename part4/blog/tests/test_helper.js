const User = require("../models/user");

const getAllUsers = async () => {
	const allUsers = await User.find({});
	return allUsers.map((u) => u.toJSON());
};

module.exports = { getAllUsers };
