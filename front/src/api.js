import axios from 'axios';

export default {
  login: (data) => axios.post('/api/login', data),
  getOpenCourses: (term) => axios.get('/api/openCourse', { params: { term }}),
  getCourseTable: (xh, term) => axios.get('/api/courseTable', { params: { xh, term } }),
  getCourseTeacherTable: (gh, term) => axios.get('/api/courseTable', { params: { gh, term } }),
  getStudents: () => axios.get('/api/students'),
  getTerms: () => axios.get('/api/terms'),
  getReportCard: (xh, term) => axios.get('/api/reportCard', { params: { xh, term }}),
  postXuanKe: (data) => axios.post('/api/chooseCourse', data)
}