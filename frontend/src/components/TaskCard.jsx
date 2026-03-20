import { updateTaskAPI, deleteTaskAPI } from "../api/task.api";
import Button from "./Button";

const STATUS_COLORS = {
    'Todo': 'bg-gray-100 text-gray-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Done': 'bg-green-100 text-green-700'
}

const STATUS_OPTIONS = ['Todo', 'In Progress', 'Done'];

const TaskCard = ({task, onUpdate, onDelete})=>{
    const handleStatusChange = async (e)=>{
        try{
            const updated = await updateTaskAPI(task._id, {status: e.target.value});
            onUpdate(updated.data);
        }catch(err){
            alert('Failed to update status')
        }
    }

    const handleDelete = async ()=>{
        if(!window.confirm('Delete this task')) return;
        try{
            await deleteTaskAPI(task._id);
            onDelete(task._id);
        }catch(err){
            alert('Failed to delete task')
        }
    }

    return(
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex-1">
                <p className="font-medium text-gray-800">{task.title}</p>
                {task.description && (
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                )}
            </div>

            <select 
                value={task.status}
                onChange={handleStatusChange}
                className={`text-xs font-medium px-3 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[task.status]}`}
            >
                {STATUS_OPTIONS.map((s)=>(
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
    )
}

export default TaskCard;