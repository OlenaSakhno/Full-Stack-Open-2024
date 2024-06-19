import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never) => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div style={{ borderBottom: "1px solid blue" }}>
          <p>
            Course: <b>{part.name}</b> - {part.exerciseCount}
          </p>
          <p>Description: {part.description}</p>
        </div>
      );
    case "group":
      return (
        <div style={{ borderBottom: "1px solid blue" }}>
          <p>
            Course: <b>{part.name}</b> - {part.exerciseCount}
          </p>
          <p>Group Project Count: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div style={{ borderBottom: "1px solid blue" }}>
          <p>
            Course: <b>{part.name}</b> - {part.exerciseCount}
          </p>
          <p>Background Material: {part.backgroundMaterial}</p>
        </div>
      );
    case "requirements":
      return (
        <div style={{ borderBottom: "1px solid blue" }}>
          <p>
            Course: <b>{part.name}</b> - {part.exerciseCount}
          </p>
          <p>Description: {part.description}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
