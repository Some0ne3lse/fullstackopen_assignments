import { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState(persons);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  });

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
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    setNewName("");
    setNewNumber("");
    setShowAll(true);
  };

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    console.log(person);
    personService.remove(person);
    // // const newList = (persons.filter(p => p.id === id))
    // personService.remove(person).then((returnedPerson) => {
    //   setPersons(persons.filter((returnedPerson) => returnedPerson.id === id));
    // });
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
      <ul>
        {namesToShow.map((person) => (
          <Persons
            key={person.name}
            person={person}
            deleteButton={() => removePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
