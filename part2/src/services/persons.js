import axios from "axios";
//const baseUrl = "http://localhost:3001/persons";  //json server
//const baseUrl = "http://localhost:8000/api/persons";
const baseUrl = "/api/persons"; // "proxy does not work"
const getAll = () => {
  return axios.get(baseUrl);
};

const create = (phoneObj) => {
  return axios.post(baseUrl, phoneObj);
};

const update = (id, phoneObj) => {
  return axios.put(`${baseUrl}/${id}`, phoneObj);
};

const remove = (id, phoneObj) => {
  return axios.delete(`${baseUrl}/${id}`, phoneObj);
};

export default {
  getAll,
  create,
  update,
  remove,
};
