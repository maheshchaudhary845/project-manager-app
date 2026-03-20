import API from "./axios";

export const getProjectsAPI = ()=> API.get('/projects');
export const createProjectAPI = (data)=> API.post('/projects', data);
export const deleteProjectAPI = (id)=> API.delete(`/projects/${id}`);