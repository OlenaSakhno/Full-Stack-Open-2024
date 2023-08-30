import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import { SuccessMessage, ErrorMessage } from "./components/Messages";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginForm, setShowLoginForm] = useState("");

  useEffect(() => {
    const localStor = window.localStorage.getItem("loggedBlogAppUser");
    setIsLoggedIn(JSON.parse(localStor));
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    setIsLoggedIn(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const handleLogin = (user) => {
    setIsLoggedIn(user);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };
  const blogFormRef = useRef();
  return (
    <div>
      {isLoggedIn?.token && (
        <>
          <p>{`${isLoggedIn?.name} is logged in as ${isLoggedIn?.username}`}</p>
          <button onClick={logoutHandler}>Logout</button>
          {successMessage && <SuccessMessage message={successMessage} />}
          <Togglable
            buttonLabel="New Blog"
            extraButtonLabel={"Cancel"}
            ref={blogFormRef}
          >
            <BlogForm
              token={isLoggedIn?.token}
              showSuccessMessage={showSuccessMessage}
              fetch={fetchBlogs}
            />
          </Togglable>
        </>
      )}

      {!isLoggedIn && (
        <>
          {!showLoginForm ? (
            <button onClick={() => setShowLoginForm(true)}>Login</button>
          ) : (
            <>
              {errorMessage && <ErrorMessage message={errorMessage} />}
              <Togglable buttonLabel="login" extraButtonLabel={"Cancel"}>
                <LoginForm
                  onLogin={handleLogin}
                  showErrorMessage={showErrorMessage}
                  setShowLoginForm={setShowLoginForm}
                />
              </Togglable>
            </>
          )}
        </>
      )}

      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} fetch={fetchBlogs} user={isLoggedIn} />
      ))}
    </div>
  );
};

export default App;
