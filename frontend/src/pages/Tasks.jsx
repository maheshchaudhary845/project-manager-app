import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTasksAPI, createTaskAPI } from '../api/task.api';
import TaskCard from '../components/TaskCard';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

const Tasks = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await getTasksAPI(projectId);
                setTasks(res.data);
            } catch (err) {
                if (err.response?.status === 404) {
                    setTasks([]);
                } else {
                    setError('Failed to load tasks');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [projectId]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title.trim()) return setError('Task title is required');

        try {
            setCreating(true);
            const res = await createTaskAPI({ title, description, projectId });
            setTasks([res.data, ...tasks]);
            setTitle('');
            setDesc('');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        } finally {
            setCreating(false);
        }
    };

    const handleUpdate = (updatedTask) => {
        setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    };

    const handleDelete = (deletedId) => {
        setTasks(tasks.filter((t) => t._id !== deletedId));
    };

    const grouped = {
        'Todo': tasks.filter((t) => t.status === 'Todo'),
        'In Progress': tasks.filter((t) => t.status === 'In Progress'),
        'Done': tasks.filter((t) => t.status === 'Done'),
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate('/projects')}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        ← Back to Projects
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tasks</h2>

                <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl shadow-sm mb-8 flex flex-col gap-4">
                    <h3 className="font-semibold text-gray-700">Add New Task</h3>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Input
                        label="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Design login page"
                    />
                    <Input
                        label="Description (optional)"
                        value={description}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Details..."
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={creating}>
                            {creating ? 'Adding...' : 'Add Task'}
                        </Button>
                    </div>
                </form>

                {loading ? (
                    <p className="text-gray-500 text-center">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p className="text-gray-400 text-center">No tasks yet. Add one above!</p>
                ) : (
                    <div className="flex flex-col gap-8">
                        {Object.entries(grouped).map(([status, statusTasks]) =>
                            statusTasks.length > 0 ? (
                                <div key={status}>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                        {status} ({statusTasks.length})
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        {statusTasks.map((task) => (
                                            <TaskCard
                                                key={task._id}
                                                task={task}
                                                onUpdate={handleUpdate}
                                                onDelete={handleDelete}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tasks;