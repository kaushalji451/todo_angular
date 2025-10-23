import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum : ["Pending","Done","Completed"],
        default : "Pending",
    },
}, {
    timestamps: true,
}
)

const Task = mongoose.model("Task", TaskSchema);
export default Task;