import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = (phoneNumber: string, password: string) =>
  api.post('/users/login', { phoneNumber, password });

export const register = (userData: any) =>
  api.post('/users/register', userData);

export const updateProfile = (userData: any) =>
  api.put('/users/profile', userData);

export const getSubjects = () =>
  api.get('/courses/subjects');

export const getGrades = () =>
  api.get('/courses/grades');

export const getTeachers = (subjectId: number, gradeId: number) =>
  api.get('/courses/teachers', { params: { subjectId, gradeId } });

export const getClasses = (teacherId: number) =>
  api.get('/courses/classes', { params: { teacherId } });

export const enrollInClass = (classId: number) =>
  api.post('/courses/enroll', { classId });

// Admin API calls
export const createSubject = (name: string) =>
  api.post('/admin/subjects', { name });

export const updateSubject = (id: number, name: string) =>
  api.put(`/admin/subjects/${id}`, { name });

export const deleteSubject = (id: number) =>
  api.delete(`/admin/subjects/${id}`);

export const createGrade = (name: string) =>
  api.post('/admin/grades', { name });

export const updateGrade = (id: number, name: string) =>
  api.put(`/admin/grades/${id}`, { name });

export const deleteGrade = (id: number) =>
  api.delete(`/admin/grades/${id}`);

export const createClass = (classData: any) =>
  api.post('/admin/classes', classData);

export const updateClass = (id: number, classData: any) =>
  api.put(`/admin/classes/${id}`, classData);

export const deleteClass = (id: number) =>
  api.delete(`/admin/classes/${id}`);