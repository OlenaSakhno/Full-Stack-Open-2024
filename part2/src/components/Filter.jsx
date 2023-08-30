import { useState, useEffect } from "react";
export const Filter = (props) => {
  const { persons, setPersonsToDisplay } = props;
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const recordsToDisplay = persons.filter((person) =>
      person?.name?.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    setPersonsToDisplay(recordsToDisplay);
  }, [searchValue, persons, setPersonsToDisplay]);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div style={{ marginBottom: "15px" }}>
      filter: <input onChange={handleSearch} value={searchValue} />
    </div>
  );
};
