const blogsRouter = require("express").Router();
const Blog = require("../models/blogDB");

blogsRouter.get("/", async (request, response) => {
	const allBlogs = await Blog.find({});
	response.json(allBlogs);
});

blogsRouter.post("/", async (request, response) => {
	const blog = new Blog(request.body);
	if (!blog.title || !blog.url) {
		return response
			.status(400)
			.json({ error: "title or url properties are missing" });
	}

	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
