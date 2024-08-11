const { test, expect, beforeEach, describe } = require("@playwright/test");
const { login } = require("./helper");
const { before } = require("node:test");

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
		beforeEach(() => {
			login(page, "PasswordIsUser123", "User123");
		});
		test("able to create a new blog", async ({ page }) => {
            
        });

        test("blog can be seen after creating", async ({page}) => {

        })
	});
});
