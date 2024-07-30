const blogsRouter = require("express").Router();
const Blog = require("../models/blogDB");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
	const allBlogs = await Blog.find({});
	response.json(allBlogs);
});

blogsRouter.post("/", async (request, response) => {
	const blog = request.body;
	if (!blog.title || !blog.url) {
		return response
			.status(400)
			.json({ error: "title or url properties are missing" });
	}

	const user = await User.findById(blog.userId);

	const newBlog = new Blog({
		title: blog.title,
		author: blog.author || "Unknown Author",
		url: blog.url,
		likes: blog.likes,
		user: user.id,
	});

	const savedBlog = await newBlog.save();
	console.log("savedBlog inside blogs.js : ", savedBlog)
	user.blogs = user.blogs.concat(newBlog._id);
	await user.save();

	response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
	const id = request.params.id;
	await Blog.findByIdAndDelete(id);
	return response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
	const id = request.params.id;

	const updatedData = await Blog.findByIdAndUpdate(
		id,
		{
			likes: request.body.likes,
		},
		{ new: true, runValidators: true, context: "query" }
	);
	response.status(202).json(updatedData);
});

module.exports = blogsRouter;
