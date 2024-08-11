const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
	beforeEach(async ({ page }) => {
		await page.goto("/");
            // empty the db here
    // create a user for the backend here
    // ...
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

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
          // ...
        })
    
        test('fails with wrong credentials', async ({ page }) => {
          // ...
        })
      })
});
