import { useEffect } from "react";
import { useState } from "react";
import { Button } from "./Button";

export const Anecdotes = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [indexOfMax, setIndexOfMax] = useState("");

  const selectNext = () => {
    const ind = Math.floor(Math.random() * anecdotes.length);
    setSelected(ind);
  };
  const increaseVotes = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    console.log(votes);

    setVotes(votesCopy);
  };
  useEffect(() => {
    setIndexOfMax(votes.indexOf(Math.max(...votes)));
    console.log(indexOfMax);
  }, [votes]);

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <div>
        <i>has {votes[selected]} votes</i>
      </div>
      <Button text={"Vote"} handleClick={increaseVotes} />
      <Button text={"Next Anecdote"} handleClick={selectNext} />
      <h3>Anecdote with the most votes:</h3>
      <p>{anecdotes[indexOfMax]}</p>
    </div>
  );
};
