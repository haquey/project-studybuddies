const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = function(req, res){
    console.log('req.body', req.body);
    let user = new User(req.body);
    user.save(function(err, user){
        if (err) return res.status(400).json(err);
        user.password = undefined;
        res.json({ user });
    });
};

exports.signin = function(req, res){
    let { username, password } = req.body;
    User.findOne({username}, function(err, user){
        if (err) return res.status(500).json(err);
        if (!user) return res.status(404).json({err: "User does not exist."});

        user.comparePassword(password, function(err, match){
            if (err) return res.status(500).json(err);
            if (!match) return res.status(401).json({ err: 'Incorrect username and password.' });

            let token = jwt.sign({_id: user._id}, process.env.SECRET_JWT);
            res.cookie('token', token, {expire: new Date() + 7777});

            let {_id, username} = user;
            return res.json({token, user: {_id, username}});
        });
    });
};

exports.signout = function(req, res){
    res.clearCookie('token');
    res.json({ message: 'Signout completed.'});
};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET_JWT,
    userProperty: 'auth'
});

exports.isAuthenticated = function(req, res, next){
    console.log('req.profile: ', req.profile);
    console.log('req.auth: ', req.auth);
    if (!(req.profile && req.auth && req.profile._id == req.auth._id)) {
        return res.status(401).json({err: "Access denied."});
    }
    next();
};

exports.userById = function(req, res, next, id){
    User.findById(id).exec(function(err, user){
        if (err || !user) return res.status(400).json({err: "User does not exist."});
        req.profile = user;
        next();
    });
};