import { formateTime } from './util';

export const openCoursesCoulmns = [
    {
      title: '课号',
      dataIndex: 'kh',
      key: 'kh'
    },
    {
      title: '课名',
      dataIndex: 'km',
      key: 'km'
    },
    {
      title: '学期',
      dataIndex: 'xq',
      key: 'xq'
    },
    {
      title: '教师',
      dataIndex: 'xm',
      key: 'xm'
    },
    {
      title: '教师工号',
      dataIndex: 'gh',
      key: 'gh'
    },
    {
      title: '上课时间',
      dataIndex: 'sksj',
      key: 'sksj'
    }
];

export const studentsColumns = [
  {
    title: '姓名',
    dataIndex: 'xm'
  },
  {
    title: '学号',
    dataIndex: 'xh',
  },
  {
    title: '性别',
    dataIndex: 'xb'
  },
  {
    title: '籍贯',
    dataIndex: 'jg'
  },
  {
    title: '联系方式',
    dataIndex: 'sjhm'
  },
  {
    title: '出生日期',
    dataIndex: 'csrq',
    customRender: (text) => {
      return formateTime(text);
    }
  },
  {
    title: '学院',
    dataIndex: 'mc'
  }
];

export const reportCardColumns = [
  {
    title: '课号',
    dataIndex: 'kh'
  },
  {
    title: '课名',
    dataIndex: 'km',
  },
  {
    title: '平时成绩',
    dataIndex: 'pscj'
  },
  {
    title: '考试成绩',
    dataIndex: 'kscj'
  },
  {
    title: '总评成绩',
    dataIndex: 'zpcj'
  }
];