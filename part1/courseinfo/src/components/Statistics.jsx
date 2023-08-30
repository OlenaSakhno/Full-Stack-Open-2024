import { StatisticLine } from "./StatisticLine";
import { useState, useEffect } from "react";

export const Statistics = (props) => {
  const { good, bad, neutral } = props;
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  useEffect(() => {
    setAverage((good + bad * -1 + neutral * 0) / 3);
    setAll(good + bad + neutral);
    if (all !== 0) setPositive((good / all) * 100);
  }, [good, bad, neutral, all]);
  return (
    <div>
      <h2>Statistics</h2>

      <table>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td>Value</td>
            <td>Comment</td>
          </tr>
          <StatisticLine value={good} text={"good"} />
          <StatisticLine value={neutral} text={"neutral"} />
          <StatisticLine value={bad} text={"bad"} />
          <StatisticLine value={all} text={"all"} />
          <StatisticLine value={average} text={"average"} percents={"%"} />
          <StatisticLine value={positive} text={"positive"} />
        </tbody>
      </table>
    </div>
  );
};
