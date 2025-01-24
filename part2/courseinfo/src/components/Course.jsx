const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Part = ({ part }) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((x) => (
        <Part part={x} key={x.id} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return <b>total of {sum} exercises</b>;
};

const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <div key={course.name}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      ))}
    </div>
  );
};

export default Course;
