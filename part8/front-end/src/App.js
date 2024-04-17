import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import {
  useApolloClient,
  useQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allPersons: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}


const App = () => {
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log("data in subscription", data);

      const addedBook = data.data.bookAdded;
      // notify(`${addedBook.title} added`);
      alert(`"${addedBook.title}" is added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  const client = useApolloClient();
  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={setErrorMessage} />
      </div>
    );
  }
  return (
    <>
      <Router>
        <div>
          <div style={{ marginBottom: "20px", display: "flex" }}>
            <Link to="/">
              <button>authors</button>
            </Link>
            <Link to="/books">
              <button>books</button>
            </Link>
            <Link to="/add">
              <button>add book</button>
            </Link>
            <div style={{ marginLeft: "160px" }}>
              <button onClick={logout}>logout</button>
              <button onClick={logout}>recomended</button>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Authors />} />
            <Route path="/books" element={<Books />} />
            <Route path="/add" element={<NewBook />} />
            {/* <Authors show={page === "authors"} />

          <Books show={page === "books"} />

          <NewBook show={page === "add"} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
