const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(morgan(":method :url :response-time :content"));

morgan.token("content", function (req, res) {
  return JSON.stringify(req.body);
});

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendie",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

// Single person
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const personFound = phonebook.find((databaseID) => databaseID.id == id);

  if (!personFound) {
    return response.status(404).json({
      error: "No such ID",
    });
  }

  response.json(personFound);
});

// Delete person
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter((person) => person.id != id);
  response.status(204).json(phonebook);
});

// Edit person info
app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const personFound = phonebook.find((person) => person.id == id);

  if (!personFound) {
    return response.status(404).json({
      error: "Person does not exist in database",
    });
  }

  personFound.number = request.body.number;
  return response.status(202).json(phonebook);
});

// Info on database
app.get("/info", (request, response) => {
  const data = `Phonebook has info for ${
    phonebook.length
  } people <br />${Date()}`;
  response.send(data);
});

const getRandomID = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// Create new person
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const personFound = phonebook.find((person) => person.name === body.name);

  if (personFound) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    id: getRandomID(4, 1000),
    name: body.name,
    number: body.number,
  };

  phonebook.push(newPerson);
  response.json(phonebook);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
