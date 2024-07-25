const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.length === 0
		? 0
		: blogs.reduce((initial, acc) => {
				return acc.likes + initial;
		  }, 0);
};

const favoriteBlog = (blogs) => {
	if (blogs.length > 0) {
		const highestLikesBlog = blogs.reduce((maxLikes, currentLikes) => {
			return maxLikes.likes > currentLikes.likes
				? maxLikes
				: currentLikes;
		}, blogs[0]);

		const { title, author, likes } = highestLikesBlog;
		return { title, author, likes };
	}
	return null;
};

module.exports = { dummy, totalLikes, favoriteBlog };
