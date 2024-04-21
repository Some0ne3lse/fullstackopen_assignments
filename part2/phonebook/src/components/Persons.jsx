const Persons = ({ person, deleteButton }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={deleteButton}>Delete</button>
    </li>
    // <ul>
    //   {props.namesToShow.map((person) => (
    //     <li key={person.name}>
    //       {person.name} {person.number}{" "}
    //       <button onClick={props.deleteButton}>Delete</button>
    //     </li>
    //   ))}
    // </ul>
  );
};

export default Persons;
