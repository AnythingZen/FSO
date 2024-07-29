const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
	const allUsers = await User.find({});
	return response.status(200).json(allUsers);
});

userRouter.post("/", async (request, response) => {
	const { username, name, password } = request.body;

	const passwordHash = await bcrypt.hash(password, 10);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();
	return response.status(201).json(savedUser);
});

module.exports = userRouter;
