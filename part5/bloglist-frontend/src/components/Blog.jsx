import { useState } from "react";

const Blog = ({ blog }) => {
	const blogStyle = {
		border: "2px solid black",
		paddingTop: 10,
		paddingLeft: 2,
		marginBottom: 5,
	};
	return (
		<div>
			{blog.map((blog) => {
				return (
					<div style={blogStyle}>
						<BlogToggleDescriptions
							key={blog.id}
							title={blog.title}
							author={blog.author}
							url={blog.url}
							likes={blog.likes}
						/>
					</div>
				);
			})}
		</div>
	);
};

const BlogToggleDescriptions = ({ title, author, url, likes }) => {
	const [view, setView] = useState(false);

	const handleClick = () => {
		setView(!view);
	};

	// <button type="button" onClick={handleClick}></button>
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
				{likes} <button type="button">like</button>
			</div>
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

export default Blog;
