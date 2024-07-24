const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const testCases = require("./testcases");

describe("total likes", () => {
	test("empty array", () => {
		assert.strictEqual(listHelper.totalLikes([]), 0);
	});

	test("one blog", () => {
		assert.strictEqual(listHelper.totalLikes(testCases.listWithOneBlog), 5);
	});

	test("multiple blogs", () => {
		assert.strictEqual(listHelper.totalLikes(testCases.blogs), 36);
	});
});
