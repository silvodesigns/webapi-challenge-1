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


module.exports = router;