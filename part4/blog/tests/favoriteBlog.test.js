const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const testCases = require("./testcases");

describe("Favorite Blog With Highest Likes", () => {
	const favoriteBlog = listHelper.favoriteBlog;
	const res1 = {
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		likes: 12,
	};
	const res2 = {
		title: "Star Wars",
		author: "Your Father",
		likes: 12,
	};
	test("Finds the highest liked blog", () => {
		assert.deepStrictEqual(favoriteBlog(testCases.blogs), res1);
	});

	test("Returns only one favorite among similar top likes", () => {
		assert.deepStrictEqual(
			favoriteBlog(testCases.blogsWithSameLikes),
			res2
		);
	});

	test("Empty blog checks", () => {
		assert.strictEqual(favoriteBlog([]), null);
	});
});
