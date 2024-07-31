const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blogDB");
const User = require("../models/user");
const helper = require("./testcases");

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	await api.post("/api/users").send(helper.user).expect(201);
});

test("correct content type", async () => {
	await api
		.get("/api/blogs/")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("every returned blog posts has property id", async () => {
	const res = await api.get("/api/blogs/");
	assert.strictEqual(
		res.body.every((blog) => blog.id),
		true
	);
});

describe("post blogs only for authenticated user, else correct error", () => {
	let token;
	beforeEach(async () => {
		const tokenContent = await api
			.post("/api/login/")
			.send(helper.user)
			.expect(200)
			.expect("Content-Type", /application\/json/);
		token = tokenContent.body.token;
	});

	test("post adds blogs in both UserDB and BlogsDB", async () => {
		await api
			.post("/api/blogs/")
			.send(helper.blogs[3])
			.set("Authorization", `Bearer ${token}`)
			.expect(201);

		const allBlogs = await Blog.find({});
		const blogOnly = allBlogs[0].title;

		const userBlogs = await User.find({});
		const userBlog = userBlogs[0].blogs;

		assert.strictEqual(allBlogs.length, 1); // successfully added
		assert(blogOnly.includes(helper.blogs[3].title), true); // adds the right content
		assert.strictEqual(userBlog.length, 1); // added id into user
	});

	test("wrong token gives status code 401", async () => {
		const errorMessage = await api
			.post("/api/blogs/")
			.send(helper.blogs[3])
			.set("Authorization", `Bearer ${token}12314`)
			.expect(401);
		assert(errorMessage.body.error.includes("token invalid"), true);
	});
});

test("blogs without likes property defaults to 0", async () => {
	for (let blog of helper.blogsMissingLikes) {
		const response = await api.post("/api/blogs").send(blog);
		const newBlog = response.body;

		assert.strictEqual(newBlog.likes === 0, true);
	}
});

test("blogs without title or url responds with 400", async () => {
	for (let blog of helper.blogsMissingTitleOrUrl) {
		await api.post("/api/blogs/").send(blog).expect(400);
	}
});

describe("delete blog from database", async () => {
	let token;
	let id;
	beforeEach(async () => {
		const tokenContent = await api
			.post("/api/login/")
			.send(helper.user)
			.expect(200)
			.expect("Content-Type", /application\/json/);
		token = tokenContent.body.token;

		const blogAdded = await api
			.post("/api/blogs/")
			.send(helper.blogs[4])
			.set("Authorization", `Bearer ${token}`)
			.expect(201);
		id = blogAdded.body.id;
		await api
			.delete(`/api/blogs/${id}`)
			.set("Authorization", `Bearer ${token}`)
			.expect(204);
	});

	test("data removed from database", async () => {
		const data = await Blog.findById("66a22e5104e97c834bc61196");
		assert.strictEqual(data, null);
	});

	test("database has one less content", async () => {
		const allBlogs = await Blog.find({});
		assert.strictEqual(allBlogs.length, 0);
	});
});

describe("put requests to update likes count", async () => {
	test("updating likes count", async () => {
		const updatedData = await api
			.put("/api/blogs/66a22e5104e97c834bc61196/")
			.send(helper.listToBeUpdated[0])
			.expect(202);
		assert.strictEqual(updatedData.body.likes, 15);
	});

	test("likes not in number", async () => {
		await api
			.put("/api/blogs/66a22e5104e97c834bc61196/")
			.send(helper.listToBeUpdated[1])
			.expect(400);
	});
});

after(async () => {
	await mongoose.connection.close();
});
