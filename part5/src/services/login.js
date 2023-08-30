import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    console.log("login service");
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { login };
