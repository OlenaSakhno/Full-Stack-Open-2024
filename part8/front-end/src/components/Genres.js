import { ALL_GENRES } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const Genres = () => {
  const result = useQuery(ALL_GENRES);
  return <div></div>;
};

export default Genres;
