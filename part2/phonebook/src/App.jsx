import { useEffect, useState } from "react";
import DisplayPerson from "./components/DisplayPerson";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import DeleteButton from "./components/DeleteButton";
import Notification from "./components/Notification";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((allData) => setPersons(allData));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const personFound = persons.find(
      (person) =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );

    if (!personFound) {
      personService
        .create(newPerson)
        .then((newData) => setPersons(persons.concat(newData)))
        .catch((error) => setMessage(error.message));
      setMessage(`Added ${newName}`);
      setTimeout(() => setMessage(null), 5000);
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace with new number?`
        )
      ) {
        personService
          .update(personFound.id, newPerson)
          .then((updatedData) =>
            setPersons(
              persons.map((person) =>
                person.id === updatedData.id ? updatedData : person
              )
            )
          )
          .catch((error) => {
            setMessage(error.message);
            setTimeout(() => setMessage(null), 5000);
          });
      }
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameInput = (e) => {
    setNewName(() => e.target.value);
  };
  const handleNumberInput = (e) => {
    setNewNumber(() => e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Confirm Delete?")) {
      const personToDelete = persons.find((person) => id === person.id);

      personService
        .deleteData(id, personToDelete)
        .then((deletedData) =>
          setPersons(persons.filter((person) => person.id != deletedData.id))
        );
    }
  };

  const personToShow = search
    ? persons.filter((person) => person.name.toLowerCase().search(search) > -1)
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />
      <Filter search={search} onChange={setSearch} />

      <PersonForm
        onSubmit={handleSubmit}
        nameValue={newName}
        onNameChange={handleNameInput}
        numberValue={newNumber}
        onNumberChange={handleNumberInput}
      />

      <h2>Numbers</h2>

      {personToShow.map((person) => (
        <div key={person.id} style={{ display: "flex", gap: "20px" }}>
          <DisplayPerson name={person.name} number={person.number} />
          <DeleteButton onClick={() => handleDelete(person.id)} />
        </div>
      ))}
    </div>
  );
};

export default App;
