<template>
  <a-layout style="display: flex; flex-direction: column; height: 100%">
    <a-layout-header style="color: #fff">
      <div style="display: flex; justify-content: space-between">
        <h2 style="color: #fff">学生成绩管理系统</h2>
        <div style="display: flex; flex-direction: row;">
          <div style="margin-right: 20px">欢迎 {{ name }}</div>
          当前学期 &nbsp;&nbsp;
          <a-dropdown style="cursor: pointer">
            <span class="ant-dropdown-link">
              {{ nowTerm }} <a-icon type="down" />
            </span>
            <a-menu slot="overlay">
              <a-menu-item v-for="term in terms" :key="term">
                <span @click="changeTerm(term)">{{term}}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content style="flex:1; background: #fff">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['sub1', 'sub2']"
            style="height: 100%"
            @click="clickItem"
          >
            <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />课程信息与选课</span>
              <a-menu-item key="1">开课表</a-menu-item>
              <a-menu-item key="2">课程表</a-menu-item>
              <a-menu-item key="3">选课</a-menu-item>
              <a-menu-item key="4">学生成绩单</a-menu-item>
              <a-menu-item key="5">成绩分布情况</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="user" />课程与成绩管理</span>
              <a-menu-item key="6">学生表</a-menu-item>
              <a-menu-item key="8">成绩管理</a-menu-item>
              <a-menu-item key="9">开课</a-menu-item>
              <a-menu-item key="10">课程表</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <a-table v-show="activeKey === '1'" :columns="openCoursesCoulmns" :dataSource="openCoursesData" :rowKey="record => (record.kh + record.xm)"></a-table>
          <a-table v-show="activeKey === '2'" :columns="openCoursesCoulmns" :dataSource="courseTableData" :rowKey="record => (record.kh + record.xm)"></a-table>
          <a-form
            :form="form"
            @submit="handleSubmit"
            v-show="activeKey === '3'"
          >
            <a-form-item
              label="课号"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 6 }"
            >
              <a-input
                v-decorator="[
                  'kh',
                  {rules: [{ required: true, message: '请输入课程名' }]}
                ]"
              />
            </a-form-item>
            <a-form-item
              label="教师号"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 6 }"
            >
              <a-input
                v-decorator="[
                  'gh',
                  {rules: [{ required: true, message: '请输入教师工号' }]}
                ]"
              />
            </a-form-item>
            <a-form-item
              :wrapper-col="{ span: 8, offset: 2 }"
            >
              <a-button
                type="primary"
                html-type="submit"
              >
                Submit
              </a-button>
            </a-form-item>
          </a-form>
          <a-table v-show="activeKey === '4'" :columns="reportCardColumns" :dataSource="reportCardData" :rowKey="record => (record.kh)"></a-table>
          <ve-histogram :data="chartData" v-if="activeKey === '5'"></ve-histogram>
          <a-table v-show="activeKey === '6'" :columns="studentsColumns" :dataSource="studentsData" :rowKey="record => (record.xh)"></a-table>
          <a-table v-show="activeKey === '10'" :columns="openCoursesTeacherColumns" :dataSource="openCoursesTeacherData" :rowKey="record => (record.kh)"></a-table>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      学生成绩管理系统 ©2018 Created by HanYang
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api';
import { openCoursesCoulmns, studentsColumns, reportCardColumns, openCoursesTeacherColumns } from './Column';
export default {
  name: 'index',
  data() {
    return {
      activeKey: '1',
      openCoursesCoulmns,
      studentsColumns,
      reportCardColumns,
      openCoursesTeacherColumns,
      openCoursesData: [],
      courseTableData: [],
      studentsData: [],
      reportCardData: [],
      openCoursesTeacherData: [],
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapGetters([
      'role',
      'userInfo',
      'terms',
      'nowTerm'
    ]),
    name() {
      if (this.userInfo && this.role) {
        return this.userInfo.xm + (this.isTeacher ? '老师' : '同学');
      }
    },
    isTeacher() {
      return this.role === 'teacher';
    },
    chartData() {
      const data = this.reportCardData.map(item => {
        return {
          '课名': item.km,
          '平时成绩': item.pscj,
          '考试成绩': item.kscj,
          '总评成绩': item.zpcj
        }
      });
      if (!data.length) {
        return {};
      }
      const columns = Object.keys(data[0]);
      return {
        columns,
        rows: data
      }
    },
    userInfoTerm () {
      const { userInfo, nowTerm } = this;
      return { userInfo, nowTerm };
    }
  },
  watch: {
    nowTerm(newValue) {
      this.loadOpenCourse(newValue);
      this.loadCourseTable(newValue);
      this.loadReportCard(newValue);
    },
    userInfoTerm: {
      handler: function (val) {
        this.loadCourseTeacherTable(val.userInfo.gh, val.nowTerm);
      },
      deep: true
    }
  },
  methods: {
    clickItem({ key }) {
      this.activeKey = key;
    },
    changeTerm(term) {
      this.$store.commit('setTerm', {
        nowTerm: term
      });
    },
    // 开课表
    loadOpenCourse(term) {
      api.getOpenCourses(term).then(res => {
        this.openCoursesData = res.data.res;
      });
    },
    // 学生课程表
    loadCourseTable(term) {
      // if (this.isTeacher) {
        api.getCourseTable('1101', this.nowTerm).then(res => {
          this.courseTableData = res.data.res;
        });
      // }
    },
    loadCourseTeacherTable(gh, term) {
      api.getCourseTeacherTable(gh, term).then(res => {
        this.openCoursesTeacherData = res.data.res;
      })
    },
    // 学生表
    loadStudents() {
      api.getStudents().then(res => {
        this.studentsData = res.data.res;
      })
    },
    // 成绩报告表
    loadReportCard(term) {
      // if (this.isTeacher) {
        api.getReportCard('1101', term).then(res => {
          this.reportCardData = res.data.res;
        });
      // }
    },
    // 选课表单提交
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const { kh, gh } = values;
          api.postXuanKe({ kh, gh, xh: '1101',xq: this.nowTerm}).then(res => {
            if(res.data.res.affectedRows === 1) {
              this.$message.success('选课成功');
              this.form.resetFields();
            } else {
              this.$message.error(res.data.res.message);
              this.form.resetFields();
            }
          });
        }
      });
    },
  },
  mounted() {
    this.loadStudents();
    this.loadCourseTeacherTable();
  },
}
</script>
