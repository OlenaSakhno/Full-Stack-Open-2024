import axios from "axios";

const baseUrl = "/api/blogs";

const createBlog = async (payload, token) => {
  try {
    console.log("in createBlog service", );
    const response = await axios.post(baseUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createBlog,
};
