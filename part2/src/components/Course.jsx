import { Part } from "./Part";
export const Course = (props) => {
  const { course } = props;
  return (
    <div>
      {course.parts.map((part) => {
        return (
          <Part partNo={part.name} exercises={part.exercises} key={part.id} />
        );
      })}
      <p style={{ fontWeight: "800" }}>
        Total of {course.parts.reduce((a, b) => a + b.exercises, 0)}
      </p>
    </div>
  );
};
