const express = require('express');


server = express();
server.use(express.json());
// Qeury params 
/*
server.get('/teste', (request,response) =>{
    const nome = request.query.nome;
    return response.json({message:`${nome}`});
});
*/

//Route params
/*
server.get('/teste/:id', (request,response) =>{
  const id = request.params.id;
  return response.json({message:`${id}`});
});
*/

const users = ['jvjs','vitor','joao'];

server.use((request,response,next) =>{
  console.time('Request');
  console.log(`Metodo: ${request.method}; URL: ${request.url}`);
  next();
  console.timeEnd('Request');
});

function checkUsersExists(request,response,next){
  if(!request.body.name){
    return response.status(400).json({error:'User name is required'})
  }
  return  next();
}

function checkUserInArray(request,response,next){
  if(!users[request.params.index]){
    return response.status(400).json({error:'User does not exists'})
  }

  return next();
}
server.get('/users',(request,response) => {
  return response.json(users);
});
server.get('/users/:index',checkUserInArray , (request,response) => {
  const { index } = request.params;
  return response.json(users[index]);
});
server.post('/users', checkUsersExists,(request,response) => {
  const { name } = request.body;

  users.push(name);
  return response.json(users);
});
server.put('/users/:index',checkUserInArray, checkUsersExists ,(request,response) => {
  const { index } = request.params;
  const { name } = request.body;
  
  users[index] = name;
  return response.json(users);
});
server.delete('/users/:index',checkUserInArray,(request,response) =>{
  const { index } = request.params;

  users.splice(index , 1 );

  return response.send();
})
server.listen(3333);