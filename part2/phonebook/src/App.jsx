import { useState } from "react";
import "./styles.css";

const Filter = ({ handleFilter }) => (
  <div>
    filter shown with <input onChange={handleFilter}></input>
  </div>
);

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState(persons);
  const [showAll, setShowAll] = useState(true);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((e) => e.name === personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
    setShowAll(true);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(value)
    );
    setFilteredNames(filtered);
    setShowAll(false);
  };

  const namesToShow = showAll ? persons : filteredNames;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>add new number</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons namesToShow={namesToShow} />
    </div>
  );
};

export default App;
