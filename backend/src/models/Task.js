const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
            minlength: [3, 'Task title must be at least 3 characters']
        }, 
        description: {
            type: String,
            trim: true,
            default: ""
        },
        status: {
            type: String,
            enum: ["Todo", "In Progress", "Done"],
            default: "Todo"
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Task", taskSchema);