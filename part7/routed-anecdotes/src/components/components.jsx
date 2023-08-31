import { Link } from "react-router-dom";

export const Footer = () => (
  <div style={{ marginTop: "100px" }}>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

export const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

export const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    {notification && <Notification notification={notification} />}
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Anecdote = ({ anecdote }) => (
  <>
    <h3>Selected anecdote: </h3>
    <b>{anecdote.content} </b> by <i>{anecdote.author}</i>
    <p>has {anecdote.votes} votes</p>
  </>
);

export const Notification = ({ notification }) => (
  <div
    style={{
      border: "1px solid green",
      backgroundColor: "#EFFFE8",
      padding: 5,
    }}
  >
    <b>
      A new anecdote <i>{notification}</i> were created.
    </b>
  </div>
);
