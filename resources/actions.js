// this file will only be used when the route begins with "/actions"

const express = require('express');
const db = require('../data/helpers/actionModel');
const actions = require('../data/helpers/projectModel');

const router = express.Router(); 


//middleware that parses request body if it is json when making post requests
router.use(express.json());

router.get('/:id', (req, res) => {
    actions.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200);
        res.json(actions);
    })
    .catch(()=> {
        res.status(404);
        res.json({"message": "the actions from the specified project does not exist"})
    })
});




// after the route has been fully configured, then we export it so it can be required where needed
module.exports = router; 