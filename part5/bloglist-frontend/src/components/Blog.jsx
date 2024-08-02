const Blog = ({ blog }) => {
	return (
		<div>
			{blog.map((blog) => {
				return (
					<BlogDescriptions
						key={blog.id}
						title={blog.title}
						author={blog.author}
						url={blog.url}
						likes={blog.likes}
					/>
				);
			})}
		</div>
	);
};

const BlogDescriptions = ({ title, author, url, likes}) => (
	<p>
		{title}<br/>{author}<br/>{url}<br/>{likes}
	</p>
);

export default Blog;
