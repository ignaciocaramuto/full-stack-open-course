const CountriesList = ({ countries }) => {
  if (countries === null) return null;

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (countries.length === 1) {
    const keys = Object.keys(countries[0].languages);

    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>capital: {countries[0].capital}</p>
        <p>area: {countries[0].area}</p>
        <p style={{ fontWeight: "bold" }}>languages</p>
        {keys.map((key) => (
          <li key={key}>{countries[0].languages[key]}</li>
        ))}
        <br />
        <img src={countries[0].flags.png} alt={countries[0].flags.alt}></img>
      </div>
    );
  }

  return (
    <div>
      {countries.map(({ name }) => (
        <p key={name.common}>{name.common}</p>
      ))}
    </div>
  );
};

export default CountriesList;
