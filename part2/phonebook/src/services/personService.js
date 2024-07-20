import axios from "axios";

const BASE_URL = "/api/persons";

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const deleteData = (dataIDToDelete, personToDelete) => {
  const request = axios.delete(`${BASE_URL}/${dataIDToDelete}`, personToDelete);
  return request.then((response) => response.data);
};

const create = (newData) => {
  const request = axios.post(BASE_URL, newData);
  return request
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const update = (dataIDToUpdate, updatedData) => {
  const request = axios.put(`${BASE_URL}/${dataIDToUpdate}`, updatedData);
  return request
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

export default {
  getAll,
  create,
  deleteData,
  update,
};
