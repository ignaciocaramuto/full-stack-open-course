import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const setNotification = (message, type) => {
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addNewPhone = (event) => {
    event.preventDefault();

    const repeatedPerson = persons.find(({ name }) => name === newName);
    if (repeatedPerson && repeatedPerson.number !== newNumber) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      }

      const updatedPerson = { ...repeatedPerson, number: newNumber };

      personsService
        .update(repeatedPerson.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== repeatedPerson.id ? person : response
            )
          );
          setNotification(`Updated ${newName}`);
        });
      return;
    }

    if (repeatedPerson) {
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
      setNotification(`Added ${newName}`);
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

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter((personMap) => personMap.id !== person.id));
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setNotification(
              `Information of ${person.name} has already been removed from server`,
              "error"
            );
          }
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
