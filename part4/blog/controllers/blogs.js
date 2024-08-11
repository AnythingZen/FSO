const blogsRouter = require("express").Router();
const Blog = require("../models/blogDB");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

// Get all blogs
blogsRouter.get("/", async (request, response) => {
	const allBlogs = await Blog.find({}).populate("user", { blogs: 0 });
	response.json(allBlogs);
});

// Create Blogs
blogsRouter.post(
	"/",
	middleware.tokenExtractor,
	middleware.userExtractor,
	async (request, response) => {
		const blog = request.body;

		if (!blog.title || !blog.url) {
			return response
				.status(400)
				.json({ error: "title or url properties are missing" });
		}

		const user = request.user;

		const newBlog = new Blog({
			title: blog.title,
			author: blog.author || "Unknown Author",
			url: blog.url,
			likes: blog.likes,
			user: user.id,
		});

		const savedBlog = await newBlog.save();
		await savedBlog.populate("user", { blogs: 0 });
		user.blogs = user.blogs.concat(newBlog._id);
		await user.save();

		response.status(201).json(savedBlog);
	}
);

// Delete selected blog based on ID
blogsRouter.delete(
	"/:id",
	middleware.tokenExtractor,
	middleware.userExtractor,
	async (request, response) => {
		const id = request.params.id;

		const decodedToken = jwt.verify(request.token, process.env.SECRET);
		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" });
		}

		const user = request.user;

		user.blogs = user.blogs.filter(
			(blogId) => blogId.toString() !== id.toString()
		);

		await user.save();

		await Blog.findByIdAndDelete(id);
		return response.status(204).end();
	}
);

// Update likes count based on ID
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
