const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acum, curr) => acum + curr.exercises, 0);
  return <b>Total of {total} exercises</b>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
