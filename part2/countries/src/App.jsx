import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setAllCountries(() => response.data);
      });
  }, []);

  const filterCountries = (e) => {
    const searchValue = e.target.value;
    const regex = new RegExp(searchValue, "gi");
    const searchRes = allCountries.filter((country) =>
      country.name.common.match(regex)
    );
    setSearchCountry(() => searchRes);
  };
  return (
    <>
      <p>
        find countries
        <input type="text" onChange={filterCountries} />
      </p>
      {searchCountry ? (
        searchCountry.length > 10 ? (
          <p>Too many results, specify more</p>
        ) : searchCountry.length < 10 ? (
          searchCountry.length === 1 ? (
            <DisplaySearch
              name={searchCountry[0].name.common}
              capital={searchCountry[0].capital}
              area={searchCountry[0].region}
              languages={searchCountry[0].languages}
              flag={searchCountry[0].flags.svg}
            />
          ) : (
            searchCountry &&
            searchCountry.map((search) => (
              <div key={search.idd.suffixes}>
                <DisplaySearches name={search.name.common} />
                <ButtonDisplay showStatus={search} />
              </div>
            ))
          )
        ) : null
      ) : null}
    </>
  );
}

const DisplaySearch = ({ name, capital, area, languages, flag }) => {
  const allLanguages = Object.values(languages);

  return (
    <>
      <h1>{name}</h1>
      <p>{capital}</p>
      <p>{area}</p>
      <h2>Languages:</h2>
      <ul>
        {allLanguages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt="CountryFlag" width="500"/>
    </>
  );
};
const DisplaySearches = ({ name }) => {
  return <p>{name}</p>;
};
const ButtonDisplay = ({ showStatus }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevClick) => (prevClick = !prevClick));
  };

  return (
    <>
      <button onClick={handleClick}>{isClicked ? 'Hide' : 'Show'}</button>
      {isClicked && (
        <DisplaySearch
          name={showStatus.name.common}
          capital={showStatus.capital}
          area={showStatus.area}
          languages={showStatus.languages}
          flag={showStatus.flags.svg}
        />
      )}
    </>
  );
};

export default App;
