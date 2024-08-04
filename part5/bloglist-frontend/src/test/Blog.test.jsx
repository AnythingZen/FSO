import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogToggleDescriptions, LikeButton } from "../components/Blog";
import BlogForm from "../components/BlogForm";
import blogService from "../services/blogs";

const initialBlog = {
	title: "First class",
	author: "Robert",
	url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
	likes: 5,
	id: "1",
	name: "Root",
};

describe("Blog renders correctly", () => {
	let renderedBlog;

	beforeEach(() => {
		render(
			<BlogToggleDescriptions
				title={initialBlog.title}
				author={initialBlog.author}
				url={initialBlog.url}
				likes={initialBlog.likes}
				id={initialBlog.id}
				name={initialBlog.name}
			/>
		);
		renderedBlog = screen.getByTestId("blogContent");
	});

	test("Blog renders with only title and author intially", () => {
		expect(renderedBlog).toHaveTextContent(initialBlog.author);
		expect(renderedBlog).toHaveTextContent(initialBlog.title);
		expect(renderedBlog).not.toHaveTextContent(initialBlog.url);
		expect(renderedBlog).not.toHaveTextContent(initialBlog.likes);
	});

	test("Clicking View Blog shows URL and Likes", async () => {
		const user = userEvent.setup();
		const buttonToClick = renderedBlog.querySelector("button");
		await user.click(buttonToClick);

		expect(renderedBlog).toHaveTextContent(initialBlog.likes);
		expect(renderedBlog).toHaveTextContent(initialBlog.url);
	});

	test("Like button is clicked twice", async () => {
		const likeButtonHandler = vi.fn();
		const user = userEvent.setup();
		const likeButtonComponent = render(
			<LikeButton
				handleLikeCount={likeButtonHandler}
				currentLike={initialBlog.likes}
				blogId={initialBlog.id}
			/>
		);
		const likeButton = likeButtonComponent.getByTestId("likeButton");

		const mockUpdateLike = vi
			.spyOn(blogService, "updateBlog")
			.mockResolvedValue(initialBlog);
		await user.click(likeButton);
		await user.click(likeButton);

		expect(likeButtonHandler.mock.calls).toHaveLength(2);
		await waitFor(() =>
			expect(mockUpdateLike).toHaveBeenCalledWith(initialBlog.id, {
				likes: initialBlog.likes + 1,
			})
		);
		mockUpdateLike.mockRestore();
	});
});

describe("Blog form", () => {
	test("Fills up input and creates blog", async () => {
		const user = userEvent.setup();

		const mockCreateBlog = vi
			.spyOn(blogService, "createBlog")
			.mockResolvedValue({
				title: "Test Blog Title",
				author: "John Doe",
				url: "http://testurl.com",
				id: "12345",
			});

		const mockSetMessage = vi.fn();
		const mockSetNewBlog = vi.fn();
		const mockCancelForm = vi.fn();

		const blogForm = render(
			<BlogForm
				setMessage={mockSetMessage}
				setNewBlog={mockSetNewBlog}
				cancelForm={mockCancelForm}
			/>
		);

		const authorInput = blogForm.getByPlaceholderText("author");
		const titleInput = blogForm.getByPlaceholderText("title");
		const urlInput = blogForm.getByPlaceholderText("url");
		const createButton = blogForm.getByTestId("createBlog");

		await user.type(authorInput, "John Doe");
		await user.type(titleInput, "Test Blog Title");
		await user.type(urlInput, "http://testurl.com");

		await user.click(createButton);

		await waitFor(() => {
			expect(mockCreateBlog).toHaveBeenCalledWith({
				title: "Test Blog Title",
				author: "John Doe",
				url: "http://testurl.com",
			});

			expect(mockSetMessage).toHaveBeenCalledWith({
				title: "Test Blog Title",
				author: "John Doe",
				url: "http://testurl.com",
				id: "12345",
			});
		});
		// Clean up the mocks
		mockCreateBlog.mockRestore();
	});
});
