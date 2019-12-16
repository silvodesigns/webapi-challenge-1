const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello from Express Sprint');
})

server.listen(3000, ()=>{
    console.log("API is now up and running")
})
