import { ALL_GENRES } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const Genres = ({ setSelectedGenre }) => {
  const result = useQuery(ALL_GENRES);
  if (result.loading) {
    return <div>loading...</div>;
  }
  const genres = result.data.getGenres.allGenres;
  // const buttonClick = ()=>{
  //     console.log(genre)
  // }
  return (
    <div>
      {genres &&
        genres.length &&
        genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      <button onClick={() => setSelectedGenre("")}>All genres</button>
    </div>
  );
};

export default Genres;
