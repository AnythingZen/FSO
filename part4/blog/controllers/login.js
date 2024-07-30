const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });
	const validPassword =
		user === null
			? false
			: await bcrypt.compare(password, user.passwordHash);

	if (!validPassword) {
		return response
			.status(401)
			.json({ error: "Invalid username or password" });
	}

	const userToken = {
		username,
		id: user._id,
	};

	const token = jwt.sign(userToken, process.env.SECRET);

	return response.status(200).send({ token, username, name: user.name });
});

module.exports = loginRouter;
