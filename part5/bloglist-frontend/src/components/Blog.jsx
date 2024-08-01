const Blog = ({ blog }) => (
	<div>
		{blog.map((blog) => {
			return (
				<BlogDescriptions
					key={blog.id}
					title={blog.title}
					author={blog.author}
				/>
			);
		})}
	</div>
);

const BlogDescriptions = ({ title, author }) => (
	<p>
		{title} {author}
	</p>
);

export default Blog;
