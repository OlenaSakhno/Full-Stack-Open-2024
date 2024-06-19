import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { CoursePart } from "./types";
import courseParts from "../data";
const App = () => {
  const courseName = "Half Stack application development";
  

  const totalExercises = courseParts.reduce(
    (sum:number, part:CoursePart) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header text={courseName} />
      <Content />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
