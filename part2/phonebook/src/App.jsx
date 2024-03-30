import { useState } from "react";
import "./styles.css";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newPerson, setNewPerson] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newPerson,
    };
    setPersons(persons.concat(personObject));
    setNewPerson("");
  };

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
