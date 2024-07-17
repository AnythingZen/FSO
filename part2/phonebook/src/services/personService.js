import axios from "axios";

const BASE_URL = "/api/persons";

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const deleteData = (dataIDToDelete, newDatas) => {
  const request = axios.delete(`${BASE_URL}/${dataIDToDelete}`, newDatas);
  return request.then((response) => response.data);
};

const create = (newData) => {
  const request = axios.post(BASE_URL, newData);
  return request.then((response) => response.data);
};

const update = (dataIDToUpdate, updatedData) => {
  const request = axios.put(`${BASE_URL}/${dataIDToUpdate}`, updatedData);
  return request.then((response) => response.data);
}

export default {
  getAll,
  create,
  deleteData,
  update,
};
