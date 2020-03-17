exports.signupValidator = function(req, res, next){
    req.check('username', 'A username is required.').notEmpty();
    req.check('password', 'A password is required.').notEmpty();
    req.check('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain a minimum of 8 characters');

    let errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);
    
    next();
};

exports.signinValidator = function(req, res, next){
    req.check('username', 'A username is required.').notEmpty();
    req.check('password', 'A password is required.').notEmpty();

    let errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);
    
    next();
};