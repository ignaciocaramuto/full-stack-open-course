import CountryDetail from "./CountryDetail.jsx";
import Country from "./Country.jsx";

const CountriesList = ({ countries }) => {
  if (countries === null) return null;

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (countries.length === 1) return <CountryDetail country={countries[0]} />;

  return (
    <div>
      {countries.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </div>
  );
};

export default CountriesList;
