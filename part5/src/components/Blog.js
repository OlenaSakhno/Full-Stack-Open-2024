import Togglable from "./Togglable";
import LikeButton from "./LikeButton";
import likeBlog from "../services/likeBlog";
import deleteBlog from "../services/deleteBlog";
import { useState } from "react";
const Blog = ({ blog, user, fetch }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [liked, setLiked] = useState(false);
  const handleLike = async (id, likes) => {
    console.log("id in like click", id);
    try {
      await likeBlog.likeBlog(id, {
        likes: liked && likes !== 0 ? likes - 1 : likes + 1,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
    fetch();
    setLiked(liked ? false : true);
  };
  const handleDelete = async (id, token) => {
    if (window.confirm("Do you really want to remove the blog?")) {
      try {
        await deleteBlog.deleteBlog(id, token);
      } catch (err) {
        console.error(err);
        throw err;
      }
      fetch();
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <b>
        {blog.title} by {blog.author}
      </b>
      <Togglable buttonLabel="View" extraButtonLabel={"Hide"}>
        <p>{blog.url}</p>
        <div>
          Likes:{blog.likes}
          <LikeButton
            onClick={() => handleLike(blog.id, blog.likes)}
            liked={liked}
          />
        </div>

        {blog?.author === user?.username && (
          <button onClick={() => handleDelete(blog.id, user?.token)}>
            Delete
          </button>
        )}
      </Togglable>
    </div>
  );
};

export default Blog;
