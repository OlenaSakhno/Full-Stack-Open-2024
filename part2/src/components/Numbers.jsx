import { PhoneNumber } from "./PhoneNumber";
export const Numbers = (props) => {
  return (
    <ul>
      {props.personsToDisplay.map((person) => (
        <PhoneNumber
          key={person.id}
          id={person.id}
          personName={person.name}
          number={person.number}
          setPersons={props.setPersons}
          persons={props.persons}
        />
      ))}
    </ul>
  );
};
