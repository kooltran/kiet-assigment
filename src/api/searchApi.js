import axios from "axios";

const targetUrl = "https://images-api.nasa.gov";

export const searchApi = searchKey => {
  return axios.get(`${targetUrl}/search?q=${searchKey}`).then(res => res.data);
};
