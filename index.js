const express = require('express');

const projectsRoutes = require('./resources/projects.js');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello from Express Sprint');
    
})


server.use('/projects', projectsRoutes)

server.listen(3000, ()=>{
    console.log("API is now up and running")
})
