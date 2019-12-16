const express = require('express');

const projectsRoutes = require('./resources/projects.js');
const actionRoutes = require('./resources/actions.js');


const server = express();

server.get('/', (req, res) => {
    res.send('Hello from Express Sprint');

})


server.use('/projects', projectsRoutes);
server.use('/actions', actionRoutes);

server.listen(3000, ()=>{
    console.log("API is now up and running")
})
