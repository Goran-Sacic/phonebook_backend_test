const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

const cors = require("cors");

app.use(cors());

morgan.token("httppostrequestdata", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :httppostrequestdata"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "pEro pErica",
    number: "00000000",
  },
];

app.get("/api/persons", (request, response) => {
  console.log("Request body:", request.body);
  response.json(persons);
});

app.get("/info", (request, response) => {
  const entries = persons.length;
  console.log(entries);
  const time = new Date();
  console.log(time);
  const responseBody = `Phonebook has info for ${entries} people.` + `${time}`;
  response.send(responseBody);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log("Request body:", request.body);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Error: missing number and/or name.",
    });
  }

  const duplicateEntry = persons.find((person) => person.name === body.name);

  if (duplicateEntry) {
    return response.status(400).json({
      error: `Error: person ${body.name} has already been added to the Phonebook.`,
    });
  }

  const randomNumber = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const person = {
    id: randomNumber(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 3.1 done
// 3.2 done
// 3.3 done
// 3.4 done and tested with Postman
// 3.5 done and tested with Postman
// 3.6 done and tested with Postman
// 3.7 done
// 3.8 done and tested with Postman, console shows data sent in HTTP post request. Example: POST /api/persons/ 200 57 - 2.236 ms {"name":"Some number","number":"55512345"}
