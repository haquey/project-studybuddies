const express = require('express');
const router = express.Router();

// const { signupValidator, signinValidator } = require('../validator');
const { isSignedIn, isAuthenticated, userById } = require('../controllers/user');
const { notebookById } = require('../controllers/notebook');
const { subjectById } = require('../controllers/subject');
const { create, remove, pageById, read, update, readPageListBySubjectId, addToNotebook } = require('../controllers/page');

router.post('/user/:userId/page/create', isSignedIn, isAuthenticated, create);
router.get('/user/:userId/page/:pageId', isSignedIn, isAuthenticated, read);
router.post('/user/:userId/notebook/:notebookId/subject/:subjectId/page/:pageId/add', isSignedIn, isAuthenticated, addToNotebook);
router.get('/user/:userId/notebook/:notebookId/subject/:subjectId/page', isSignedIn, isAuthenticated, readPageListBySubjectId);
router.delete('/user/:userId/page/:pageId', isSignedIn, isAuthenticated, remove);
router.patch('/user/:userId/page/:pageId', isSignedIn, isAuthenticated, update);

router.param('userId', userById);
router.param('notebookId', notebookById);
router.param('subjectId', subjectById);
router.param('pageId', pageById);

module.exports = router;
