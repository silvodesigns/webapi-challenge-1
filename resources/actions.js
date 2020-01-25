const express = require('express');

const action_db = require('../data/helpers/actionModel');
const project_db = require('../data/helpers/projectModel');

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


module.exports = router