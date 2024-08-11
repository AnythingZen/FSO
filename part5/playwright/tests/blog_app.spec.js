const { test, expect, beforeEach, describe } = require("@playwright/test");
const {
	login,
	createBlog,
	toggleOpenBlog,
	handleLikeButton,
	toggleOpenMultipleBlogs,
} = require("./helper");

describe("Blog app", () => {
	beforeEach(async ({ page, request }) => {
		// empty the db
		await request.post("/api/testing/reset");
		// create a user for the backend here
		await request.post("/api/users/", {
			data: {
				name: "Root",
				username: "PasswordIsUser123",
				password: "User123",
			},
		});

		await page.goto("/");
	});

	test("Login form is shown", async ({ page }) => {
		const header = page.getByRole("heading", {
			name: "Log into application",
		});
		const username = page.getByText("Username*");
		const password = page.getByText("Password*");
		const loginButton = page.getByRole("button", { name: "Login" });

		await expect(header).toBeVisible();
		await expect(username).toBeVisible();
		await expect(password).toBeVisible();
		await expect(loginButton).toBeVisible();
	});

	describe("Login", () => {
		test("succeeds with correct credentials", async ({ page }) => {
			login(page, "PasswordIsUser123", "User123");

			const successfulLoginMessage = page.getByRole("heading", {
				name: "Root logged in",
			});
			const logoutButton = page.getByRole("button", { name: "Logout" });

			await expect(successfulLoginMessage).toBeVisible();
			await expect(logoutButton).toBeVisible();
		});

		test("fails with wrong credentials", async ({ page }) => {
			login(page, "WrongUsername", "User123");

			const errorMessage = page.getByRole("heading", {
				name: "Invalid username or password",
			});
			await expect(errorMessage).toBeVisible();
			await expect(errorMessage).toHaveCSS(
				"border",
				"3px solid rgb(255, 0, 0)"
			);
		});
	});

	describe("After login", () => {
		beforeEach(({ page }) => {
			login(page, "PasswordIsUser123", "User123");
		});

		test("new blog created displays green message", async ({ page }) => {
			await createBlog(
				page,
				"Canonical string reduction",
				"Edsger W. Dijkstra",
				"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
			);
			const successfulBlogAddedMessage = page.getByRole("heading", {
				name: "Canonical string reduction Edsger W. Dijkstra",
			});
			await expect(successfulBlogAddedMessage).toBeVisible();
			await expect(successfulBlogAddedMessage).toHaveCSS(
				"border",
				"3px solid rgb(0, 128, 0)"
			);
		});

		describe("New blog", () => {
			beforeEach(async ({ page }) => {
				await createBlog(
					page,
					"First class tests",
					"Robert C. Martin",
					"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html"
				);
				await toggleOpenBlog(
					page,
					/^First class tests Robert C\. MartinView$/
				);
			});

			test("can toggle open new blog", async ({ page }) => {
				await expect(
					page.getByRole("button", { name: "Remove" })
				).toBeVisible();
			});

			test("increases like counts upon pressing", async ({ page }) => {
				const likeButton = page.getByTestId("likeButton");
				await expect(likeButton).toBeVisible();

				await expect(page.getByText("0 like")).toBeVisible();
				await likeButton.click();
				await expect(page.getByText("1 like")).toBeVisible();
			});

			test("can be deleted", async ({ page }) => {
				const blogToBeDeleted = page.getByText(
					"First class testsHideRobert C"
				);
				await expect(blogToBeDeleted).toBeVisible();
				// Setup listener for the window.confirm dialog
				page.once("dialog", (dialog) => {
					dialog.accept();
				});
				await page.getByRole("button", { name: "Remove" }).click();
				await expect(blogToBeDeleted).not.toBeVisible();
			});

			test("can only be seen by user created", async ({
				page,
				request,
			}) => {
				await request.post("/api/users/", {
					data: {
						name: "NewUser",
						username: "NewUserPassword12345",
						password: "12345",
					},
				});
				const blogCreatedByRoot = page.getByText(
					"First class testsHideRobert C"
				);
				await expect(blogCreatedByRoot).toBeVisible();

				await page.getByRole("button", { name: "Logout" }).click();

				const header = page.getByRole("heading", {
					name: "Log into application",
				});
				await expect(header).toBeVisible();

				await login(page, "NewUserPassword12345", "12345");

				const successfulLoginMessage = page.getByRole("heading", {
					name: "NewUser logged in",
				});
				await expect(successfulLoginMessage).toBeVisible();
				await expect(blogCreatedByRoot).not.toBeVisible();
			});
		});

		describe("Creating multiple new blogs", () => {
			beforeEach(async ({ page }) => {
				await createBlog(
					page,
					"First class tests",
					"Robert C. Martin",
					"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html"
				);
				await createBlog(
					page,
					"React patterns",
					"Michael Chan",
					"https://reactpatterns.com/"
				);
				await createBlog(
					page,
					"Canonical string reduction",
					"Edsger W. Dijkstra",
					"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
				);
			});

			test("is successful", async ({ page }) => {
				await expect(
					page.getByText("First class tests Robert C.")
				).toBeVisible();
				await expect(
					page.getByText("React patterns Michael")
				).toBeVisible();
				await expect(
					page.getByText(
						"Canonical string reduction Edsger W. DijkstraView"
					)
				).toBeVisible();
			});

			test("blogs are sorted by like counts", async ({ page }) => {
				await toggleOpenMultipleBlogs(page);
				const oneLikeBlog = page.getByTestId("likeButton").first();
				await handleLikeButton(oneLikeBlog, 1);

				const twoLikesBlog = page
					.getByText("React patternsHideMichael")
					.getByTestId("likeButton");
				await handleLikeButton(twoLikesBlog, 2);

				const threeLikesBlog = page.getByTestId("likeButton").nth(2);
				await handleLikeButton(threeLikesBlog, 3);

				await page.reload();
				await toggleOpenMultipleBlogs(page);
				const blogElements = page.getByTestId("blogContent");

				// Extract the like counts from each blog element
				const likeCounts = await blogElements.evaluateAll((blogDivs) =>
					blogDivs.map((blog) =>
						parseInt(
							blog
								.querySelector("div:nth-child(4)")
								.textContent.trim()
								.split(" ")[0]
						)
					)
				);

				// Check if the like counts are in descending order
				expect(likeCounts).toEqual(likeCounts.sort((a, b) => b - a));
			});
		});
	});
});
