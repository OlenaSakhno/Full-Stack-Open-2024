import { useState } from "react";
import { Course } from "./components/Course";
import { Button } from "./components/Button";
import { Statistics } from "./components/Statistics";
import { Anecdotes } from "./components/Anecdotes";
import { coursesInfo } from "./courseInfo";
import { PhoneBook } from "./components/PhoneBook";
import { Countries } from "./components/Countries";

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
      <h1>Web development curriculum</h1>
      {coursesInfo.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <Course course={course} />
        </div>
      ))}

      <h1 style={{ marginTop: "50px", borderTop: "solid 2px black" }}>
        Give feedback
      </h1>
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
      <h1 style={{ marginTop: "50px", borderTop: "solid 2px black" }}>
        Anecdotes:
      </h1>
      <Anecdotes />

      <h1 style={{ marginTop: "50px", borderTop: "solid 2px black" }}>
        Phone Book
      </h1>

      <PhoneBook />

      <h1 style={{ marginTop: "50px", borderTop: "solid 2px black" }}>
      Find countries
      </h1>

      <Countries />
    </div>
  );
};

export default App;
