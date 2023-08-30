import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, voteAnecdote } from "../reducers/anecdoteReducer";
import Notification from "./Notification";

const AnecdoteList = ({ filter }) => {
  // const voteID = useSelector((state) => state?.anecdotes?.voteID);
  const dispatch = useDispatch();
  const [votedID, setVotedID] = useState(null);

  const vote = (anecdote) => {
    const { id, votes } = anecdote;
    console.log(votes);
    // dispatch(voteAnecdote(id, votes));
    dispatch(voteAnecdote(anecdote));
    setVotedID(id);
    setTimeout(() => {
      setVotedID(null);
    }, 5000);
  };

  const anecdotes = useSelector((state) => {
    return state.anecdotes;
  });
  const anecdotesToRender = anecdotes?.filter((anecdote) =>
    anecdote.content?.toLowerCase().includes(filter?.toLowerCase())
  );

  return (
    <div>
      <h2>Anecdotes</h2>
      {votedID && <Notification id={votedID} />}
      {anecdotesToRender.map((anecdote) => (
        <div key={anecdote.id} style={{ marginBottom: "10px" }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
