const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const validate = require('../utilities/user-validation');
const utilities = require('../utilities');
const authenticate = require('../utilities/authenticate');
router.get('/', (req, res, next) => {
    console.log('Swagger hit GET /users'); // <-- this logs every request to /users
    next(); // pass control to your controller
}, userController.getAllUsers);


router.get('/:id', userController.getSingleUser);

router.post(
    '/', 
    authenticate.isAuthenticated,
    validate.CreateUserRules(), 
    validate.checkUserData, 
    utilities.handleErrors(userController.createUser)
    
);
router.put(
    '/:id', 
    authenticate.isAuthenticated,
    validate.idParamRule(),
    validate.updateUserRules(),
    validate.checkUpdateUserData,
    userController.updateUser
);

router.delete('/:id', authenticate.isAuthenticated, userController.deleteUser);

module.exports = router;