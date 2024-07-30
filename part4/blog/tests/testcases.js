const listWithOneBlog = [
	{
		title: "Go To Statement Considered Harmful",
		author: "A random test author",
		url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
		likes: 5,
	},
];

const listToBeUpdated = [
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 15,
	},
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: "test",
	},
];

const blogs = [
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		_id: "66a22e5104e97c834bc61196",
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
	},
	{
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
	},
	{
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
	},
	{
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
	},
	{
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
	},
];

const blogsWithSameLikes = [
	{
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
	},
	{
		title: "Star Wars",
		author: "Your Father",
		url: "http://www.starwars.com/idk",
		likes: 12,
	},
];

const blogsMissingLikes = [
	{
		title: "Batman",
		author: "Joker",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
	},
	{
		title: "Star Wars",
		author: "Your Father",
		url: "http://www.starwars.com/idk",
	},
];

const blogsMissingTitleOrUrl = [
	{
		author: "Joker",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
	},
	{
		title: "Star Wars",
		author: "Your Father",
	},
];

module.exports = {
	blogs,
	listWithOneBlog,
	listToBeUpdated,
	blogsWithSameLikes,
	blogsMissingLikes,
	blogsMissingTitleOrUrl,
};
