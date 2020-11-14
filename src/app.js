const express = require("express");
const cors = require("cors");

const { v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repository = {
    id: v4(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;
  const repository = repositories.find(repository => repository.id === id);

  if(!repository) {
    return response.status(400).json();
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;
  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repository => repository.id === id);

  if(repository) {
    repositories.pop(repository);
    return response.status(204).json();
  }

  return response.status(400).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repository => repository.id === id);

  if(repository) {
    repository.likes += 1;
    return response.json(repository);
  }

  return response.status(400).json();
});

module.exports = app;
