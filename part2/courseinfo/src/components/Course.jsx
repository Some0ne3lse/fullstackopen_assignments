const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Total = ({ parts }) => {
  let total = parts.reduce((s, p) => s + p.exercises, 0);
  return <strong>total of {total} exercises</strong>;
};

const Part = ({ parts }) => {
  return (
    <li>
      {parts.name} {parts.exercises}
    </li>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map((parts) => (
          <Part key={parts.id} parts={parts} />
        ))}
      </ul>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <ul style={{ listStyleType: "none" }}>
        {course.map((course) => (
          <li key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
