import { useState, useEffect } from "react";
import { PhoneForm } from "./PhoneForm";
import { Filter } from "./Filter";
import { Numbers } from "./Numbers";
import personsServices from "../services/persons";

export const PhoneBook = () => {
  const [persons, setPersons] = useState([]);
  //     [
  //     { id: 1, name: "Arto Hellas", number: 555 },
  //     { id: 2, name: "Olena Sakhno", number: 777 },
  //     { id: 3, name: "Mariia Kudelia", number: 222 },
  //     { id: 4, name: "George Kudelia", number: 333 },
  //     { id: 5, name: "George Sakhno", number: 444 },
  //   ]
  useEffect(() => {
    personsServices
      .getAll("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);
  const [personsToDisplay, setPersonsToDisplay] = useState(persons);

  return (
    <div>
      <PhoneForm
        persons={persons}
        setPersons={setPersons}
        setPersonsToDisplay={setPersons}
      />
      <h2>Numbers</h2>
      <Filter persons={persons} setPersonsToDisplay={setPersonsToDisplay} />
      <Numbers
        personsToDisplay={personsToDisplay}
        setPersons={setPersons}
        persons={persons}
      />
    </div>
  );
};
