import axios from "axios";
import { useState, useEffect } from "react";

export const Countries = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [weather, setWeather] = useState({});
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const apiKey = process.env.REACT_APP_API_KEY;
  //get data about country
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    const result = data.filter((country) =>
      country?.name?.common?.toLowerCase().includes(searchValue)
    );

    if (result.length > 10 && searchValue !== "") setShowWarning(true);
    else {
      setShowWarning(false);
      if (searchValue !== "") {
        setCountriesToDisplay(result);
      } else setCountriesToDisplay([]);
    }
    if (result.length === 1) weatherRequest(result[0].capital[0]);
  }, [searchValue]);

  const langArr = (langObj) => {
    let langToDisplay = [];
    let languages = Object.keys(langObj);
    languages.forEach((language) => {
      langToDisplay.push(langObj[language]);
    });
    return langToDisplay;
  };
  //on select one
  const handleShow = (country) => {
    const selectedCountry = countriesToDisplay.filter(
      (c) => c.name.common === country.name.common
    );
    setCountriesToDisplay(selectedCountry);
    weatherRequest(selectedCountry[0].capital[0]);
  };
  //get data about capital city
  const weatherRequest = async (capCity) => {
    await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${capCity}&appid=${apiKey}`
    ).then((response) => {
      const weather = response.data.weather[0].description;
      const temp = response.data.main.temp;
      const icon = response.data.weather[0].icon;
      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      setWeather({ weather, temp, imgURL });
    });
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      {/* If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific: */}
      {showWarning && (
        <div className="warning">To many matches, specify another filter</div>
      )}
      <div style={{ marginBottom: "15px" }}>
        Find countries: <input onChange={handleSearch} value={searchValue} />
      </div>
      {/* When there is only one country matching the query, then the basic data of the country (eg. capital and area), its flag and the languages ​​spoken are shown: */}
      {countriesToDisplay.length === 1 ? (
        <div>
          <h3>{countriesToDisplay[0].name.common}</h3>
          <p>
            <b>Capital: </b> {countriesToDisplay[0].capital[0]}
          </p>
          <p>
            <b>Area: </b> {countriesToDisplay[0].area}
          </p>
          <p>
            <b>Languages: </b>
            {langArr(countriesToDisplay[0].languages).map((l) => {
              return <li>{l}</li>;
            })}
          </p>
          <img
            src={countriesToDisplay[0].flags.png}
            alt=""
            style={{ border: "1px solid black" }}
          />

          <h4>Weather</h4>
          <div>
            <p>{weather.temp}</p>
            <p>{weather.weather}</p>
            <img src={weather.imgURL} alt={weather.weather} />
          </div>
        </div>
      ) : (
        //   If there are ten or fewer countries, but more than one, then all countries matching the query are shown:
        <ul>
          {countriesToDisplay.map((country) => {
            return (
              <li>
                {country.name.common}{" "}
                <button
                  onClick={() => handleShow(country)}
                  style={{ color: "blue" }}
                >
                  Show
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
