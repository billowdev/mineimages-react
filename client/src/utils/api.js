export const API_URL = process.env.REACT_APP_API_URL;
const axios = require("axios");
const Cookies = require("js-cookie");

export const Authen = async (username, password) => {
  const data = { username: username, password: password };
  let status = false;
  axios.post(`${API_URL}/signin`, data).then((response) => {
    if (response.data.error) {
      alert(response.data.error);
    } else {
      Cookies.set("access-token", response.data, { expires: 30 });
      status = true;
    }
  });
  return status;
};


