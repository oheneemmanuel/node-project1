const express = require('express');

const router = express.Router();

const directorController = require('../controllers/directors');
const validate = require('../utilities/directors-validator');
const utilities = require('../utilities');
const authenticate = require('../utilities/authenticate');
router.get('/', directorController.getAllDirectors); 

router.get('/:id', directorController.getSingleDirector);

router.post(
    '/', 
    authenticate.isAuthenticated,
    validate.CreateDirectorRules(), 
    validate.checkDirectorData, 
    utilities.handleErrors(directorController.createDirector)
    
);
router.put(
    '/:id', 
    authenticate.isAuthenticated,
    validate.idParamRule(),
    validate.updateDirectorRules(),
    validate.checkUpdateDirectorData,
    directorController.updateDirector
);

router.delete('/:id', authenticate.isAuthenticated, directorController.deleteDirector);

module.exports = router;