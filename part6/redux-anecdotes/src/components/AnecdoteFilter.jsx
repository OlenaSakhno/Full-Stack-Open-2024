import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/anecdoteReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    dispatch(setFilter(filter));
  };

  return (
    <div>
      Filter Anecdotes:
      <input
        style={{ marginLeft: "10px" }}
        type="text"
        placeholder="Input filter "
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default AnecdoteFilter;
