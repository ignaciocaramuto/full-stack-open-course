import { useState } from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Option = ({ option, count }) => {
  return (
    <p>
      {option} {count}
    </p>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Total = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>statistics</h1>
      <Option option="good" count={good} />
      <Option option="neutral" count={neutral} />
      <Option option="bad" count={bad} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header course="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Total good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
