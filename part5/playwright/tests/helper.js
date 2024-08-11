const login = async (page, username, password) => {
	await page.getByLabel("Username*").click();
	await page.getByLabel("Username*").fill(username);
	await page.getByLabel("Password*").click();
	await page.getByLabel("Password*").fill(password);

	await page.getByRole("button", { name: "Login" }).click();
};

module.exports = { login };
