import axios from 'axios';

export const fetchProjects = () => axios.get('/api/projects').then(r => r.data);
export const createProject = (data) => axios.post('/api/projects', data).then(r => r.data);
export const updateProject = (id, data) => axios.put(`/api/projects/${id}`, data).then(r => r.data);
export const deleteProject = (id) => axios.delete(`/api/projects/${id}`).then(r => r.data);
export const submitContact = (data) => axios.post('/api/contact', data).then(r => r.data);
