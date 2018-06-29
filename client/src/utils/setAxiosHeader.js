import axios from "axios";

const setAxiosHeader = token => {
  if (token) {
    axios.defaults.headers.common["x-auth"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth"];
  }
};
export default setAxiosHeader;
