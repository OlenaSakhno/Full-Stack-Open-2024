import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnecdoteFilter from "./components/AnecdoteFilter";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import anecdoteService from "./services/anecdotes";
import { initAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteReducer, {
  appendAnecdotes,
  setAnecdotes,
} from "./reducers/anecdoteReducer";

const App = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h1>Anecdotes</h1>
      <i style={{ color: "blue", marginBottom: "20px" }}>
        don't forget to run json server for this task
      </i>
      <AnecdoteFilter />
      <AnecdoteList filter={filter} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
