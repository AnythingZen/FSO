import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
	const renderBlog = () => {
		const sortedBlog = blog.sort((a, b) => b.likes - a.likes);
		return sortedBlog.map((blog) => {
			return (
				<BlogToggleDescriptions
					title={blog.title}
					author={blog.author}
					url={blog.url}
					likes={blog.likes}
					name={blog.user.name}
					id={blog.id}
					key={blog.id}
				/>
			);
		});
	};

	return <div>{renderBlog()}</div>;
};

const BlogToggleDescriptions = ({ title, author, url, likes, id, name }) => {
	const [view, setView] = useState(false);
	const [likesCount, setLikesCount] = useState(likes);
	const [deleteBlog, setDeleteBlog] = useState(false);
	const blogStyle = deleteBlog
		? { display: "none" }
		: {
				border: "2px solid black",
				paddingTop: 10,
				paddingLeft: 2,
				margin: "10px 0",
		  };

	const handleClick = () => {
		setView(!view);
	};
	return view ? (
		<div style={blogStyle}>
			<div>
				{title}
				<button type="button" onClick={handleClick}>
					Hide
				</button>
			</div>
			<div>{author}</div>
			<div>{url}</div>
			<div>
				{likesCount}{" "}
				<LikeButton
					handleLikeCount={setLikesCount}
					currentLike={likesCount}
					blogId={id}
				/>
			</div>
			<div>{name}</div>
			<DeleteButton
				title={title}
				author={author}
				blogId={id}
				deleteBlog={setDeleteBlog}
			/>
		</div>
	) : (
		<div style={blogStyle}>
			{title}
			<button type="button" onClick={handleClick}>
				View
			</button>
		</div>
	);
};

const LikeButton = ({ handleLikeCount, currentLike, blogId }) => {
	const incrementLikes = () => {
		handleLikeCount((initialLikes) => initialLikes + 1);
		const newLikes = {
			likes: currentLike + 1,
		};
		blogService.updateBlog(blogId, newLikes);
	};
	return (
		<button type="button" onClick={incrementLikes}>
			like
		</button>
	);
};

const DeleteButton = ({ title, author, blogId, deleteBlog }) => {
	const handleRemove = () => {
		if (window.confirm(`Remove blog ${title} by ${author}`)) {
			blogService.deleteBlog(blogId)
			deleteBlog((isDeleted) => !isDeleted);
		}
	};

	return (
		<div>
			<button type="button" onClick={handleRemove}>
				Remove
			</button>
		</div>
	);
};

export default Blog;
