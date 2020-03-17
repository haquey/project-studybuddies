const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: { unique: true },
        maxlength: 32
    },
    // email: {
    //     type: String,
    //     trim: true,
    //     required: true,
    //     maxlength: 32
    // },
    password: {
        type: String,
        required: true
    }
}, 
{ timestamps: true });

userSchema.pre('save', function(next) {
    let user = this;

    if(!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt){
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
    


userSchema.methods = {
    comparePassword: function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, valid) {
            if (err) return callback(err);
            callback(null, valid);
        });
    }
};

module.exports = mongoose.model('User', userSchema);