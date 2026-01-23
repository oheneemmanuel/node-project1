const express = require('express');

const router = express.Router();

const directorController = require('../controllers/directors');
const validate = require('../utilities/directors-validator');
const utilities = require('../utilities');
router.get('/', directorController.getAllDirectors); 

router.get('/:id', directorController.getSingleDirector);

router.post(
    '/', 
    validate.CreateDirectorRules(), 
    validate.checkDirectorData, 
    utilities.handleErrors(directorController.createDirector)
    
);
router.put(
    '/:id', 
    validate.idParamRule(),
    validate.updateDirectorRules(),
    validate.checkUpdateDirectorData,
    directorController.updateDirector
);

router.delete('/:id', directorController.deleteDirector);

module.exports = router;