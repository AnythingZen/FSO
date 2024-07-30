const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

describe("starts with 1 user in DB", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("randomtest", 10);
		const user = new User({
			username: "baseTest",
			passwordHash,
		});

		await user.save();
	});

	test("creating new username", async () => {
		const initialTotal = await helper.getAllUsers();

		const newUser = {
			username: "secondTester",
			name: "yourAverageBoi",
			password: "newSekret",
		};
		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const newDB = await helper.getAllUsers();
		assert.strictEqual(newDB.length, initialTotal.length + 1);

		const allUsernames = newDB.map((user) => user.username);
		assert(allUsernames.includes(newUser.username));
	});

	test("non unique username fails with proper status code", async () => {
		const initialLength = (await helper.getAllUsers()).length;

		const similarUsername = {
			username: "baseTest",
			name: "ShouldntWork",
			password: "justATest",
		};

		const errorResponse = await api
			.post("/api/users")
			.send(similarUsername)
			.expect(400);

		const finalLength = (await helper.getAllUsers()).length;
		assert(
			errorResponse.body.error.includes(
				"expected `username` to be unique"
			)
		);
		assert(finalLength, initialLength);
	});
});

after(async () => {
	await mongoose.connection.close();
});
