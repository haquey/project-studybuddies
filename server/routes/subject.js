const express = require('express');
const router = express.Router();

// const { signupValidator, signinValidator } = require('../validator');
const { isSignedIn, isAuthenticated, userById } = require('../controllers/user');
const { notebookById } = require('../controllers/notebook');
const { create, remove, subjectById, read, update, readSubjectListByNotebookId, updateOrder } = require('../controllers/subject');

router.post('/user/:userId/notebook/:notebookId/subject/create', isSignedIn, isAuthenticated, create);
router.get('/user/:userId/notebook/:notebookId/subject/:subjectId', isSignedIn, isAuthenticated, read);
router.get('/user/:userId/notebook/:notebookId/subject/', isSignedIn, isAuthenticated, readSubjectListByNotebookId);
router.delete('/user/:userId/notebook/:notebookId/subject/:subjectId', isSignedIn, isAuthenticated, remove);
router.patch('/user/:userId/notebook/:notebookId/subject/:subjectId', isSignedIn, isAuthenticated, update);
router.patch('/user/:userId/notebook/:notebookId/subject/:subjectId/order', isSignedIn, isAuthenticated, updateOrder);

router.param('userId', userById);
router.param('notebookId', notebookById);
router.param('subjectId', subjectById);

module.exports = router;
