import axios from 'axios';
// axios.defaults.baseURL = 'http://hysite.xin:4396';

export default {
  login: (data) => axios.post('/api/login', data),
  getOpenCourses: (term) => axios.get('/api/openCourse', { params: { term }}),
  getCourseTable: (xh, term) => axios.get('/api/courseTable', { params: { xh, term } }),
  getCourseTeacherTable: (gh, term) => axios.get('/api/courseTable', { params: { gh, term } }),
  getStudents: () => axios.get('/api/students'),
  getTerms: () => axios.get('/api/terms'),
  getClasses: () => axios.get('/api/class'),
  getReportCard: (xh, term) => axios.get('/api/reportCard', { params: { xh, term }}),
  getReportCardTeacher: (gh, term) => axios.get('/api/reportCard', { params: { gh, term }}),
  postXuanKe: (data) => axios.post('/api/chooseCourse', data),
  postKaiKe: (data) => axios.post('/api/openCourse', data),
  postManageGrade: (data) => axios.post('/api/manageGrade', data),
  dropCourse: (data) => axios.post('/api/dropCourse', data)
}