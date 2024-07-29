import { useState } from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Option = ({ option, count }) => {
  if (isNaN(count)) return null;
  return (
    <p>
      {option} {count}
    </p>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, total, score }) => {
  const average = score / total;
  const positive = (good / total) * 100;
  return (
    <>
      <h1>statistics</h1>
      <Option option="good" count={good} />
      <Option option="neutral" count={neutral} />
      <Option option="bad" count={bad} />
      <Option option="all" count={total} />
      <Option option="average" count={average} />
      <Option option="positive" count={positive} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
    setScore(score + 1);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(updatedNeutral + good + bad);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(updatedBad + good + neutral);
    setScore(score - 1);
  };

  return (
    <div>
      <Header course="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        score={score}
      />
    </div>
  );
};

export default App;
