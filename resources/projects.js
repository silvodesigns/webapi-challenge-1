const express = require('express');

const project_db= require('../data/helpers/projectModel');
const router = express.Router();
router.use(express.json());


router.get('/', (req, res) => {
    project_db.get()
     .then(projects => {
         res.status(200);
         res.json(projects);
     })
     .catch(()=> {
         res.status(404);
         res.json({"message": "the projects you were trying to find do not exist"})
     })
})

router.get('/:id', (req, res) => {
    project_db.get(req.params.id)
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

                project_db.insert(req.body)
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

router.put('/:id', (req, res) => {

    const {name, description } = req.body;

    if(!name || !description){
        res.status(400).json({errorMessage: "Please provide a name and description for the project"})
    } else {

                project_db.update(req.params.id,req.body)
                .then(project => {
                    res.status(201);
                    res.json(project);
                })
                .catch(()=> {
                    res.status(500);
                    res.json({"message": "Could not update the project with specified ID"})
                })
            }       
});

router.delete('/:id', (req, res) => {
    project_db.remove(req.params.id)
    .then(project => {
        res.status(200);
        res.json({"message": "The project with specified ID was successfully deleted"})
    })
    .catch( () =>{
        res.status(500);
        res.json({"errorMessage": "The projecy with specified ID could not be deleted"})
    })
})


module.exports = router;