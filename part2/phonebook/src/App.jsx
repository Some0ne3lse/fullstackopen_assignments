import { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedPerson, setSearchedPerson] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const found = persons.find((e) => e.name === newName);

    if (found) {
      if (
        window.confirm(
          `${found.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(found.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === found.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Changed ${found.name}'s number`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch(() => {
            setErrorMessage(
              `Information of ${found.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== found.id));
          });
      }
      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`Added ${personObject.name}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  const deletePerson = (id) => {
    const found = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${found.name} ?`)) {
      personService.remove(id).then(() => {
        setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id));
      });
      setSuccessMessage(`Deleted ${found.name}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlePersonSearch = (event) => {
    setSearchedPerson(event.target.value);
  };

  const personToShow = persons.filter((e) =>
    e.name.toLowerCase().includes(searchedPerson.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type={"success"} />
      <Notification message={errorMessage} type={"error"} />
      <Filter value={searchedPerson} onChange={handlePersonSearch} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameChange={handlePersonChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsList={personToShow} deleteFunction={deletePerson} />
    </div>
  );
};

export default App;
