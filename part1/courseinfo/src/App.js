import { useState } from "react";
import { Content } from "./components/Content";
import { Button } from "./components/Button";
import { Statistics } from "./components/Statistics";
import { Anecdotes } from "./components/Anecdotes";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    console.log("good, value before", good);
    setGood(good + 1);
  };
  const increaseNeutral = () => {
    console.log("neutral, value before", good);
    setNeutral(neutral + 1);
  };
  const increaseBad = () => {
    console.log("bad, value before ", good);
    setBad(bad + 1);
  };
  const reset = () => {
    setGood(0);
    setNeutral(0);
    setBad(0);
  };

  return (
    <div>
      <Content />
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={increaseGood} text={"Good"} />
        <Button handleClick={increaseNeutral} text={"Neutral"} />
        <Button handleClick={increaseBad} text={"Bad"} />
        {good + bad + neutral !== 0 ? (
          <Statistics good={good} neutral={neutral} bad={bad} />
        ) : (
          <h3>No feedback given</h3>
        )}
        <Button handleClick={reset} text={"RESET"} />
      </div>
      <h1>Anecdotes:</h1>
      <Anecdotes />
    </div>
  );
};

export default App;
