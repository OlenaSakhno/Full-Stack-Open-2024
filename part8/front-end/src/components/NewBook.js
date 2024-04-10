import { useState } from "react";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState("");

  // if (!props.show) {
  //   return null
  // }

  const [addBook] = useMutation(
    ADD_BOOK,
    // { //TODO this does not work. Fix it
    //   onError: (error) => {
    //     setMessage(error.graphQLErrors[0].message);
    //   },
    // },
    {
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    }
  );
  const submit = async (event) => {
    event.preventDefault();
    try {
      await addBook({ variables: { title, author, published, genres } });
      setTitle("");
      setPublished("");
      setAuthor("");
      setGenres([]);
      setGenre("");
      setMessage("");
    } catch (err) {
      setMessage("Error");
      console.log("error", message);
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(+target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
      {message && <p style={{ color: "red" }}>Error</p>}
    </div>
  );
};

export default NewBook;
