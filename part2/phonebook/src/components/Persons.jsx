const Persons = (props) => {
  return (
    <ul>
      {props.namesToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
