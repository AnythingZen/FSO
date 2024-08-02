import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => {
		return response.data;
	});
};

const createBlog = (newBlog) => {
	const header = {
		headers: {
			Authorization: token,
		},
	};

	const request = axios.post(baseUrl, newBlog, header);
	return request.then((response) => response.data);
};

const updateBlog = (id, blog) => {
	const request = axios.put(`${baseUrl}/${id}`, blog);
	return request.then((response) => {
		return response.data;
	});
};

export default { getAll, setToken, createBlog, updateBlog };
