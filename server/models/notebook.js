const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const notebookSchema = new mongoose.Schema({
    ownerId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    collaborators: {
        type: [String]
    },
    public: {
        type: Boolean,
        default: false
    }
}, 
{ timestamps: true });

module.exports = mongoose.model('Notebook', notebookSchema);