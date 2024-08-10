import { useState } from "react";
import CountryDetail from "./CountryDetail.jsx";

const Country = ({ country }) => {
  const [showDetail, setShowDetail] = useState();

  return (
    <>
      <p>
        {country.name.common}{" "}
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? "hide" : "show"}
        </button>
      </p>
      {showDetail && <CountryDetail country={country} />}
    </>
  );
};

export default Country;
