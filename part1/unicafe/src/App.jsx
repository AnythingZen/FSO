import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button feedback="good" onClick={() => setGood(good + 1)} />
      <Button feedback="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button feedback="bad" onClick={() => setBad(bad + 1)} />
      <DisplayStats good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

const Button = ({ feedback, onClick }) => {
  return <button onClick={onClick}>{feedback}</button>;
};

const DisplayStats = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return <h3>No feedback given</h3>;
  }
  const total = good + bad + neutral;
  const average = total / 3;
  const positive = `${(good / total) * 100} %`;

  return (
    <div>
      <h2>Statistics</h2>
      <StatsLine text="good" value={good} />
      <StatsLine text="neutral" value={neutral} />
      <StatsLine text="bad" value={bad} />
      <StatsLine text="average" value={average} />
      <StatsLine text="positive" value={positive} />
    </div>
  );
};

const StatsLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

export default App;
