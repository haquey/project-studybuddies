const express = require('express');
const router = express.Router();

// const { signupValidator, signinValidator } = require('../validator');
const { isSignedIn, isAuthenticated, userById } = require('../controllers/user');
const { create, remove, notebookById, read, update, readNotebookListByUserId } = require('../controllers/notebook');

router.post('/user/:userId/notebook/create', isSignedIn, isAuthenticated, create);
router.get('/user/:userId/notebook/:notebookId', isSignedIn, isAuthenticated, read);
router.get('/user/:userId/notebook/', isSignedIn, isAuthenticated, readNotebookListByUserId);
router.delete('/user/:userId/notebook/:notebookId', isSignedIn, isAuthenticated, remove);
router.patch('/user/:userId/notebook/:notebookId', isSignedIn, isAuthenticated, update);

router.param('userId', userById);
router.param('notebookId', notebookById);

module.exports = router;
