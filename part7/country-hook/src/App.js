import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
7.
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        setCountry(response);
      })
      .catch((error) => {
        console.log("error", error.toJSON());
        setCountry(false);
      });

  }, [name]);
  console.log("country=", country);

  if (name === "") {
    return null;
  }

  if (!country) {
    return [];
  }
  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (country.length === 0) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.official} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <img
        style={{ border: "1px solid black" }}
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name.official}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");

  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
