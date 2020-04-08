const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;



const pageSchema = new mongoose.Schema({
    ownerId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    notebookId: {
        type: ObjectId,
        ref: "Notebook"
    },
    subjectId: {
        type: ObjectId,
        ref: "Subject"
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 128
    },
    collaborators: {
        type: [String]
    },
    tags: {
        type: [String],
    },
    notes: [{
        text: { type: String, required: true },
        xPosition: { type: Number, required: true },
        yPosition: { type: Number, required: true },
        isEditing: { type: Boolean, required: true, default: false }
    }],
    order: {
        type: Number
    }
}, 
{ timestamps: true });

module.exports = mongoose.model('Page', pageSchema);