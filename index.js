const express = require('express')
const app = express()

app.use(express.json());

let customers = [
  { id: 1, name: "IFPI", site: "https://www.ifpi.edu.br/" },
  { id: 2, name: "Google", site: "http://google.com" },
  { id: 3, name: "UOL", site: "http://uol.com.br" }
];

app.get("/hello", (req, res) => {
  const { nome, idade } = req.query;
  return res.json({
    title: "Hello World",
    message: `Olá ${nome} tudo bem!?`,
    idade: idade
  });
});

//Route params
//Recebe os dados da requisição na rota.
//Caso de uso: Melhor maneira para buscar algo específico, deletar ou atualizar 
//usando o identificador único, por exemplo:
// http://localhost:3000/hello/Darcio
// Route params = /hello/:nome

app.get("/hello/:nome", (req, res) => {
  const { nome } = req.params;

  return res.json({
    title: "Hello World",
    message: `Olá ${nome} tudo bem!? `
  });
});

app.get("/customers", (req, res) => {
  return res.json(customers);
});

app.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(item => item.id === id);
  const status = customer ? 200 : 404;

  return res.status(status).json(customer);
});

app.post("/customers", (req, res) => {
  const { name, site } = req.body;
  const id = customers[customers.length - 1].id + 1;
  const newCustomer = { id, name, site };
  customers.push(newCustomer);
  return res.status(201).json(newCustomer);
});


app.put("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, site } = req.body;

  const index = customers.findIndex(item => item.id === id);
  const status = index >= 0 ? 200 : 404;

  if (index >= 0) {
    customers[index] = { id: parseInt(id), name, site };
  }

  return res.status(status).json(customers[index]);
});

app.delete("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex(item => item.id === id);
  const status = index >= 0 ? 200 : 404;

  if (index >= 0) {
    customers.splice(index, 1);
  }

  return res.status(status).json();
});

app.listen(3000)