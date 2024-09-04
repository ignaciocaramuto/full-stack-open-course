require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist"));

app.get("/info", (request, response) => {
  Person.find({}).then((person) =>
    response.send(
      "<p>Phonebook has info for " +
        person.length +
        " people</p><p>The current time is " +
        new Date() +
        "</p>"
    )
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  Person.findById(id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  Person.findByIdAndDelete(id).then(() => {
    response.status(204).end();
  });
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
