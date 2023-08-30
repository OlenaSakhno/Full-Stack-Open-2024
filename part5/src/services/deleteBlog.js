import axios from "axios";

const baseUrl = "/api/blogs";

const deleteBlog = async (id, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
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
  deleteBlog,
};
