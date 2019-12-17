// this file will only be used when the route begins with "/actions"

const express = require('express');

const action_db = require('../data/helpers/actionModel');
const project_db = require('../data/helpers/projectModel');

const router = express.Router({
    mergeParams: true,
}); 


//middleware that parses request body if it is json when making post requests
router.use(express.json());


router.get('/', (req, res) => {
    project_db.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200);
        res.json(actions);
    })
    .catch(()=> {
        res.status(404);
        res.json({"message": "the actions from the specified project does not exist"})
    })
});

router.get('/:id', (req, res) => {
    action_db.get(req.params.id)
    .then(action => {
        res.status(200);
        res.json(action);
    })
    .catch(()=> {
        res.status(404);
        res.json({"message": "the action with the specified project does not exist"})
    })
});


router.post('/', (req, res) => {

    const { notes, description } = req.body;

    if(!description || !notes){
        res.status(400).json({errorMessage: "Please provide  a description , note and id for the action"})
    } else {
                project_db.get(req.params.id)
                .then(project => {
                    if(project){
                            action_db.insert({...req.body, project_id : req.params.id})
                            .then(action => {
                                res.status(201);
                                res.json(action);
                            })
                            .catch(()=> {
                                res.status(500);
                                res.json({"message": "Could not post the action error"})
                            })
                        } else {

                            res.status(500);
                            res.json({"message": "The project with this ID does not exist so action could not be created"})

                        }
                })
            
               
            }       
});


router.put('/:id', (req, res) => {

    const {project_id, notes, description } = req.body;

    if(!project_id ||!description || !notes){
        res.status(400).json({errorMessage: "Please provide a name and description for the action to update"})
    } else {

                action_db.update(req.params.id,{...req.body})
                .then(action => {
                    res.status(201);
                    res.json(action);
                })
                .catch(()=> {
                    res.status(500);
                    res.json({"message": "Could not update the action for the project"})
                })
            }       
});

router.delete('/:id', (req, res) => {
   action_db.remove(req.params.id)
    .then(action => {
        res.status(200);
        res.json({"message": "The action with specified ID was successfully deleted"})
    })
    .catch( () =>{
        res.status(500);
        res.json({"errorMessage": "The action with specified ID could not be deleted"})
    })
})






// after the route has been fully configured, then we export it so it can be required where needed
module.exports = router; 