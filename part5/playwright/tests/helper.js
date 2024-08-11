const login = async (page, username, password) => {
	await page.getByLabel("Username*").click();
	await page.getByLabel("Username*").fill(username);
	await page.getByLabel("Password*").click();
	await page.getByLabel("Password*").fill(password);

	await page.getByRole("button", { name: "Login" }).click();
};

const createBlogHelper = async (page, blogType, blogDesc) => {
	const input = await page.getByPlaceholder(blogType);
	await input.click();
	await input.fill(blogDesc);
};

const createBlog = async (page, blogTitleDesc, blogAuthorDesc, blogUrlDesc) => {
	await page.getByTestId("toggleButton").click();

	await createBlogHelper(page, "title", blogTitleDesc);
	await createBlogHelper(page, "author", blogAuthorDesc);
	await createBlogHelper(page, "url", blogUrlDesc);

	await page.getByTestId("createBlog").click();

	await page.getByText(`${blogTitleDesc} ${blogAuthorDesc} added`).waitFor();
};

const toggleOpenBlog = async (page, text) => {
	await page
		.locator("div")
		.filter({
			hasText: text,
		})
		.getByRole("button")
		.click();
};

const handleLikeButton = async (page, timesClicked) => {
	for (let i = 0; i < timesClicked; i++) {
		await page.click();
	}
};

const toggleOpenMultipleBlogs = async (page) => {
	await toggleOpenBlog(page, /^First class tests Robert C\. MartinView$/);
	await toggleOpenBlog(page, /^React patterns Michael ChanView$/);
	await toggleOpenBlog(
		page,
		/^Canonical string reduction Edsger W\. DijkstraView$/
	);
};

module.exports = { login, createBlog, toggleOpenBlog, handleLikeButton, toggleOpenMultipleBlogs };
