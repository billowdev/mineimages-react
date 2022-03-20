import Cookies from "js-cookie";
const token = Cookies.get("access-token");
export const API_URL = process.env.REACT_APP_API_URL;
export const AccessHeader = { "x-access-token": token }