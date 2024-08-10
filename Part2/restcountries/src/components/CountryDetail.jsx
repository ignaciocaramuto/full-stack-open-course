const CountryDetail = ({ country }) => {
  if (country === null) return null;
  const keys = Object.keys(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p style={{ fontWeight: "bold" }}>languages</p>
      {keys.map((key) => (
        <li key={key}>{country.languages[key]}</li>
      ))}
      <br />
      <img src={country.flags.png} alt={country.flags.alt}></img>
    </div>
  );
};

export default CountryDetail;
