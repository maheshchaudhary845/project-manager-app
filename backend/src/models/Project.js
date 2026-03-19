const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Project name is required'],
            trim: true,
            minlength: [3, 'Project name must be at least 3 characters']
        }, 
        description: {
            type: String,
            trim: true,
            default: ""
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, 
    {timestamps: true}
)

module.exports = mongoose.model("Project", projectSchema);