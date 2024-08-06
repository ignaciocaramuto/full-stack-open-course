import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addNewPhone = (event) => {
    event.preventDefault();

    const repeatedPerson = persons.findIndex(({ name }) => name === newName);
    if (repeatedPerson !== -1) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    const filteredPersons = persons.filter(({ name }) =>
      name.toLowerCase().includes(newFilter.toLowerCase())
    );

    setPersons(filteredPersons);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deletePerson = (personId) => {
    const person = persons.find(({ id }) => id === personId);

    if (!person) {
      window.alert(`${person.name} doesn't exist`);
      return;
    }

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((personMap) => personMap.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addNewPhone={addNewPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
