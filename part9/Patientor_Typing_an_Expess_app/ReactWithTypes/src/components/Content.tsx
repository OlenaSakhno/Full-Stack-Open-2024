import Part from "../components/Part";
import { CoursePart } from "../types";
import courseParts from "../../data";

const Content = () => {
  return (
    <>
      {courseParts.map((part: CoursePart, index: number) => (
        <Part key={index} part={part} />
      ))}
    </>
  );
};

export default Content;
