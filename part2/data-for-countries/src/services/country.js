import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

const getOne = (country) => {
  const request = axios.get(`${baseUrl}/${country}`);
  return request.then((response) => response.data);
};

export default {
  getOne,
};
