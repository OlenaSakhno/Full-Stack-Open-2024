import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { ALL_AUTHORS } from "./queries";

const App = () => {
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
      <button onClick={logout}>logout</button>
      <Router>
        <div>
          <div style={{ marginBottom: "20px" }}>
            <Link to="/">
              <button>authors</button>
            </Link>
            <Link to="/books">
              <button>books</button>
            </Link>
            <Link to="/add">
              <button>add book</button>
            </Link>
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
