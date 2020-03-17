const express = require('express');
const router = express.Router();

const { signupValidator, signinValidator } = require('../validator');
const { signup, signin, signout, isSignedIn, isAuthenticated, userById } = require('../controllers/user');

router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, signin);
router.get('/signout', signout);

router.get('/test', isSignedIn, function(req, res){
    res.json("hello");
});

router.get('/test/:userId', isSignedIn, function(req, res){
    res.json(req.profile);
});

router.get('/test/auth/:userId', isSignedIn, isAuthenticated, function(req, res){
    res.json(req.profile);
});

router.param('userId', userById);

module.exports = router;
