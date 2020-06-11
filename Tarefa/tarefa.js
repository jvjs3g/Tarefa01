const express = require('express');

server = express();
server.use(express.json());

const projects = [{
  id:"0",
  title:"GoStack",
  tasks:["repositorio"]
},
{
  id:"1",
  title:"GoStack1",
  tasks:["repositorio1"]
}];


//  Mostra a Quantidade de requisições feitas 
function logRequest(request,response,next){
  console.count("Numero de requisições");
  return next();
}
server.use(logRequest);

// Verifica se o ID que o usuario esta enviando existe realmente .
function checkIDExists(request,response,next){
  const { id } = request.params;
  if(!projects[id]){
    return response.json({error:"ID not found"})
  }
    return next();
}


// Faz a listagem de todos os projetos
server.get('/projects',(request,response) => {
  return response.json(projects);
});


// Altera o titulo de determinado projeto pelo ID
server.put('/projects/:id',checkIDExists,(request,response) =>{
  const { id } = request.params;
  const { title } = request.body;

  projects[id].title = title; 
  return response.json(projects);
});


// Deleta determinado projeto pelo ID
server.delete('/projects/:id',checkIDExists,(request,response)=>{
  const { index } = request.params;

  projects.splice(index,1);
  return response.json(projects);
});

// Cria um novo projeto
server.post('/projects',(request,response)=>{
  const { id , title , tasks } = request.body;

  const newProject = {
    id,
    title,
    tasks
  }
  projects.push(newProject);
  return response.json(projects);
});

// adiciona uma nova tarefa em determinado projeto pelo ID
server.post('/projects/:id/tasks',checkIDExists ,(req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);


  project.tasks.push(title);
  return res.json(project);
});

server.listen(3333);