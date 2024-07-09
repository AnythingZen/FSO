const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part={{ part1, part2, part3 }}
        exercise={{ exercises1, exercises2, exercises3 }}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ part, exercise }) => {
  return (
    <>
      <p>
        {part.part1} {exercise.exercises1}
      </p>
      <p>
        {part.part2} {exercise.exercises2}
      </p>
      <p>
        {part.part3} {exercise.exercises3}
      </p>
    </>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

export default App;
