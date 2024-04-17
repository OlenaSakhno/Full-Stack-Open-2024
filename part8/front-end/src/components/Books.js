import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import Genres from "./Genres";
import { useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const result = useQuery(ALL_BOOKS);
  // if (!props.show) {
  //   return null;
  // }
  if (result.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;
  console.log("selectedGenre", selectedGenre);
  const filteredByGenreBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;

  return (
    <div>
      <h2>Books</h2>
      {selectedGenre ? (
        <p>
          In genre: <b>{selectedGenre}</b>
        </p>
      ) : (
        <p>All genres</p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genre(s)</th>
          </tr>
          {filteredByGenreBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Show books by genre:</p>
      <Genres setSelectedGenre={setSelectedGenre} />
    </div>
  );
};

export default Books;
