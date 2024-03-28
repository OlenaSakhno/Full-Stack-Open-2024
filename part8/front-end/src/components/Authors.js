import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const Authors = (props) => {
  const result1 = useQuery(ALL_AUTHORS);
  // if (!props.show) {
  //   return null;
  // }

  const authors = result1.data?.allAuthors;
  const [born, setBorn] = useState("");
  const [author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateBirthYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  //Error handling
  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setErrorMessage("Author not found");
    }
  }, [result.data]);

  if (result1.loading) {
    return <div>loading...</div>;
  }
  const submit = (e) => {
    e.preventDefault();
    updateBirthYear({ variables: { name: author, born: born } });
    setAuthor("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20", border: "1px solid grey" }}>
        <form onSubmit={submit}>
          <div>
            Author Name
            <select
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            >
              <option></option>
              {authors.map((author, i) => (
                <option key={i}>{author.name}</option>
              ))}
            </select>
          </div>
          <div>
            Born:
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(+target.value)}
            />
          </div>
          <button type="submit" disabled={!born || !author}>
            Submit
          </button>
        </form>
        {errorMessage && <p color="red">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Authors;
