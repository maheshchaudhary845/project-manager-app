import API from "./axios";

export const getTasksAPI = (projectId)=> API.get(`/tasks/project/${projectId}`);
export const createTaskAPI = (data)=> API.post('/tasks', data);
export const updateTaskAPI = (id, data)=> API.put(`/tasks/${id}`, data);
export const deleteTaskAPI = (id)=> API.delete(`/tasks/${id}`);