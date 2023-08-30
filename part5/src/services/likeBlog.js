import axios from "axios";

const baseUrl = "/api/blogs";

const likeBlog = async (id, payload) => {
  try {
    console.log("in likeBlog service");
    const response = await axios.put(`${baseUrl}/${id}`, payload, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  likeBlog,
};
