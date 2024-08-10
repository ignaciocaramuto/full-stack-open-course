import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import CountriesList from "./components/countriesList";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [countriesToShow, setCountriesToShow] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countries) => setCountries(countries));
  }, []);

  const handleFindCountries = (event) => {
    const countryForSearch = event.target.value.toLowerCase();

    const countriesFiltered = countries.filter(({ name }) =>
      name.common.toLowerCase().includes(countryForSearch)
    );

    setCountriesToShow(countriesFiltered);
  };

  return (
    <div>
      <label htmlFor="find">find countries</label>
      <input id="find" onChange={handleFindCountries} />
      <CountriesList countries={countriesToShow} />
    </div>
  );
};

export default App;
