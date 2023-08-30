import personsServices from "../services/persons";
export const PhoneNumber = (props) => {
  const { number, personName, id, persons, setPersons } = props;
  const handleDelete = () => {
    if (window.confirm("Do you really want to delete record?")) {
      personsServices
        .remove(id)
        .then((res) => console.log(res))
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
  };
  return (
    <li>
      {number}-{personName}{" "}
      <button onClick={handleDelete} style={{ color: "blue" }}>
        delete
      </button>
    </li>
  );
};
