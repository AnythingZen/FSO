const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blogDB");
const helper = require("./testcases");

beforeEach(async () => {
	await Blog.deleteMany({});

	await Blog.insertMany(helper.blogs);
});

test("correct content type", async () => {
	await api
		.get("/api/blogs/")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("correct number of blogs", async () => {
	const res = await api.get("/api/blogs/");
	assert.strictEqual(res.body.length, 6);
});

test("every returned blog posts has property id", async () => {
	const res = await api.get("/api/blogs/");
	assert.strictEqual(
		res.body.every((blog) => blog.id),
		true
	);
});

test("post adds blogs in correct content type", async () => {
	await api
		.post("/api/blogs/")
		.send(helper.listWithOneBlog[0])
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const allBlogs = await api.get("/api/blogs/");
	assert.strictEqual(allBlogs.body.length, helper.blogs.length + 1);
	assert(
		allBlogs.body.some((blog) => {
			return blog.author === "A random test author";
		}),
		true
	);
});

test("blogs without likes propety defaults to 0", async () => {
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

after(async () => {
	await mongoose.connection.close();
});
