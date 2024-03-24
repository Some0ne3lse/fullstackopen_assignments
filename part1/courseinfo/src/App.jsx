const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part
        part={props.name.parts[0].name}
        exercise={props.name.parts[0].exercises}
      />
      <Part
        part={props.name.parts[1].name}
        exercise={props.name.parts[1].exercises}
      />
      <Part
        part={props.name.parts[2].name}
        exercise={props.name.parts[2].exercises}
      />
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.name.parts[0].exercises +
        props.name.parts[1].exercises +
        props.name.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course} />
      <Content name={course} />
      <Total name={course} />
    </>
  );
};

export default App;
