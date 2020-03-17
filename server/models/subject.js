const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subjectSchema = new mongoose.Schema({
    notebookId: {
        type: ObjectId,
        ref: "Notebook",
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    }
}, 
{ timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);