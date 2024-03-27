import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const DisplayScore = ({ type, counter }) => (
  <div>
    {type} {counter}
  </div>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positivePercentage = (good / all) * 100;

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header text="statistics" />
      <DisplayScore type="good" counter={good} />
      <DisplayScore type="neutral" counter={neutral} />
      <DisplayScore type="bad" counter={bad} />
      <DisplayScore type="all" counter={all} />
      <DisplayScore type="average" counter={average} />
      <DisplayScore type="positive" counter={`${positivePercentage} %`} />
    </div>
  );
};

export default App;
