import { useState } from "react";
import personsServices from "../services/persons";
import { Notification } from "./Notification";
export const PhoneForm = (props) => {
  const { persons, setPersons, setPersonsToDisplay } = props;
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleMessage = (action) => {
    setShowMessage(true);
    setMessage(`${action} ${newName}`);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  const addNameToPhoneBook = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person) {
      if (
        window.confirm(
          `${newName}  is already added to phone book (Current number ${person.number}). \r Would you like to update phone with new number ${newNumber}?`
        )
      ) {
        const changedPerson = { ...person, number: newNumber };
        personsServices
          .update(person.id, changedPerson)

          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson.data))
            );
          })
          .catch((err) => {
            console.log("err=>", err);
            setMessage(` ${person.name}' was already removed from server`);
            setError(true);
            handleMessage("Error: ");
          });
        handleMessage("Updated");
      }
    } else {
      const phoneObj = {
        // id: persons.length + 1,
        name: newName,
        number: newNumber,
      };

      if (newName.length < 3) {
        setError(true);
        setMessage(
          `Person validation. Name ' ${phoneObj.name} shorter than minimum allowed length (3)`
        );
        console.log(newName.length, error);
      } else {
        setPersons([...persons, phoneObj]);
        setPersonsToDisplay([...persons, phoneObj]);
      }
      personsServices
        .create(phoneObj)
        .then((res) => {
          console.log("post res=>", res);
        })
        .catch((err) => {
          console.log("err on create=>", err);
          setError(true);
          setMessage(
            `Person validation. Name ' ${phoneObj.name} shorter than minimum allowed length (3)`
          );
        });
      setError(false);
      handleMessage("Added");
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addNameToPhoneBook}>
      {showMessage && <Notification message={message} error={error} />}
      <h3>Add a new record</h3>
      <i style={{ color: "red" }}>json server need to be run</i>
      <div style={{ marginBottom: "5px" }}>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div style={{ marginBottom: "5px" }}>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
