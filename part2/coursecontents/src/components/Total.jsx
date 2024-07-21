const Total = ({ total }) => {
  const totalValue = total.reduce((acc, part) => part.exercises + acc, 0);
  return <h3>total of {totalValue} exercises</h3>;
};

export default Total;
