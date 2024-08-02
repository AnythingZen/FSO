import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
	const blogStyle = {
		border: "2px solid black",
		paddingTop: 10,
		paddingLeft: 2,
		margin: "10px 0",
	};

	const renderBlog = () => {
		const sortedBlog = blog.sort((a, b) => b.likes - a.likes)
		return (
			sortedBlog.map((blog) => {
				return (
					<div style={blogStyle} key={blog.id}>
						<BlogToggleDescriptions
							title={blog.title}
							author={blog.author}
							url={blog.url}
							likes={blog.likes}
							name={blog.user.name}
							id={blog.id}
						/>
					</div>
				);
			})
		)
	}

	return (
		<div>
			{renderBlog()}
		</div>
	);
};

const BlogToggleDescriptions = ({ title, author, url, likes, id, name }) => {
	const [view, setView] = useState(false);
	const [likesCount, setLikesCount] = useState(likes);

	const handleClick = () => {
		setView(!view);
	};
	return view ? (
		<>
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
		</>
	) : (
		<>
			{title}
			<button type="button" onClick={handleClick}>
				View
			</button>
		</>
	);
};

const LikeButton = ({ handleLikeCount, currentLike, blogId }) => {
	const incrementLikes = async () => {
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

export default Blog;
