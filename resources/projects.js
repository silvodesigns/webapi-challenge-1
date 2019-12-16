// this file will only be used when the route begins with "/projects"

const express = require('express');
const db = require('../data/helpers/projectModel');
const router = express.Router(); 

//middleware that parses request body if it is json  when making post requests
router.use(express.json());

router.get('/', (req, res) => {
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
    //req.params.id holds the value of the project id sent on URL
    db.get(req.params.id)
    .then(project => {
        res.status(200);
        res.json(project);
    })
    .catch(()=> {
        res.status(404);
        res.json({"message": "the project you were trying to find does not exist"})
    })
});

router.post('/', (req, res) => {

    const {name, description } = req.body;

    if(!name || !description){
        res.status(400).json({errorMessage: "Please provide a name and description for the project"})
    } else {

                db.insert(req.body)
                .then(project => {
                    res.status(201);
                    res.json(project);
                })
                .catch(()=> {
                    res.status(500);
                    res.json({"message": "Could post the project error"})
                })
            }       
});


// after the route has been fully configured, then we export it so it can be required where needed
module.exports = router; 