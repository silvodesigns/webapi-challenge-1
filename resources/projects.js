const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router(); 

// this file will only be used when the route begins with "/projects"
router.get('/', (req, res) => {
//   res.status(200).send('hello from the GET /projects endpoint');
     db.get()
     .then(projects => {
         res.status(200);
         res.json(projects);
     })
     .catch(()=> {
         res.status(404);
         res.json({"message": "the projects you were trying to find do not exist"})
     })
});

router.get('/:id', (req, res) => {
  res.status(200).send('hello from the GET /projects/:id endpoint');
});

router.post('/', (req, res) => {
  res.status(200).send('hello from the POST /projects endpoint');
});

// after the route has been fully configured, then we export it so it can be required where needed
module.exports = router; 