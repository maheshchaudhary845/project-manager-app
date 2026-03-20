import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjectsAPI, createProjectAPI, deleteProjectAPI } from '../api/project.api';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await getProjectsAPI();
                setProjects(res.data);
            } catch (err) {
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return setError('Project name is required');

        try {
            setCreating(true);
            const res = await createProjectAPI({ name, description });
            setProjects([res.data, ...projects]);
            setName('');
            setDesc('');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create project');
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this project and all its tasks?')) return;
        try {
            await deleteProjectAPI(id);
            setProjects(projects.filter((p) => p._id !== id));
        } catch (err) {
            alert('Failed to delete project');
        }
    };
    console.log(projects);
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Projects</h2>

                <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl shadow-sm mb-8 flex flex-col gap-4">
                    <h3 className="font-semibold text-gray-700">Create New Project</h3>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Input
                        label="Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Website Redesign"
                    />
                    <Input
                        label="Description (optional)"
                        value={description}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Short description..."
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={creating}>
                            {creating ? 'Creating...' : 'Create Project'}
                        </Button>
                    </div>
                </form>

                {loading ? (
                    <p className="text-gray-500 text-center">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p className="text-gray-400 text-center">No projects yet. Create one above!</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {projects?.map((project) => (
                            <div
                                key={project._id}
                                className="bg-white border border-gray-200 rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div
                                    className="cursor-pointer flex-1"
                                    onClick={() => navigate(`/tasks/${project._id}`)}
                                >
                                    <h4 className="font-semibold text-gray-800">{project.name}</h4>
                                    {project.description && (
                                        <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => navigate(`/tasks/${project._id}`)}>
                                        Open
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(project._id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;