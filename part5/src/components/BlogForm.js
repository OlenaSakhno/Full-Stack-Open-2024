import createBlog from "../services/createBlog";
import { useState } from "react";

const BlogForm = (props) => {
  const { token, showSuccessMessage, fetch } = props;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handlePostBlog = async (event) => {
    event.preventDefault();
    const payload = {
      title,
      author,
      url,
      likes: 0,
    };

    try {
      await createBlog.createBlog(payload, token);
      showSuccessMessage(`New blog ${title} was added by ${author}`);
    } catch (err) {
      console.log(err);
      throw err;
    }

    setTitle("");
    setAuthor("");
    setUrl("");
    fetch();
  };
  return (
    <>
      <h2> Post New Blog </h2>
      <form onSubmit={handlePostBlog}>
        <div>
          Title
          <input
            autoComplete="none"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            style={{ margin: "5px 0" }}
          />
        </div>
        <div>
          Author
          <input
            autoComplete="none"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            style={{ margin: "5px 0" }}
          />
        </div>
        <div>
          URL
          <input
            autoComplete="none"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
            style={{ margin: "5px 0" }}
          />
        </div>
        <button type="submit" style={{ margin: "10px 0" }}>
          Post
        </button>
      </form>
    </>
  );
};

export default BlogForm;
