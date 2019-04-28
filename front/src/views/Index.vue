<template>
  <a-layout style="display: flex; flex-direction: column; height: 100%">
    <a-layout-header style="color: #fff">
      <div style="display: flex; justify-content: space-between">
        <h2 style="color: #fff">学生成绩管理系统</h2>
        <div style="display: flex; flex-direction: row;">
          <div style="margin-right: 20px">欢迎 {{ name }} <a-icon @click="logout" type="logout" style="cursor: pointer"/></div>
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
            :defaultSelectedKeys="['1', '6', '3-1']"
            :defaultOpenKeys="['sub1', 'sub2', 'sub3']"
            style="height: 100%"
            @click="clickItem"
          >
            <a-sub-menu key="sub1" v-if="!isTeacher && !isAdmin">
              <span slot="title"><a-icon type="user" />课程信息与选课</span>
              <a-menu-item key="1">开课表</a-menu-item>
              <a-menu-item key="2">课程表</a-menu-item>
              <a-menu-item key="3">选课</a-menu-item>
              <a-menu-item key="31">退课</a-menu-item>
              <a-menu-item key="4">学生成绩单</a-menu-item>
              <a-menu-item key="5">成绩分布情况</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2" v-if="isTeacher">
              <span slot="title"><a-icon type="user" />课程与成绩管理</span>
              <a-menu-item key="6">学生表</a-menu-item>
              <a-menu-item key="8">成绩管理</a-menu-item>
              <a-menu-item key="9">开课</a-menu-item>
              <a-menu-item key="10">课程表</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3" v-if="isAdmin">
              <span slot="title"><a-icon type="user" />管理员控制台</span>
              <a-menu-item key="3-1">开启关闭选课系统</a-menu-item>
              <a-menu-item key="3-2">导入学生信息</a-menu-item>
              <a-menu-item key="3-3">导入老师信息</a-menu-item>
              <a-menu-item key="3-4">开启一个新学期</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }" v-if="isAdmin">
          <router-view ></router-view>
        </a-layout-content>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }" v-if="!isAdmin">
          <a-table v-show="activeKey === '1'" :columns="openCoursesCoulmns" :dataSource="openCoursesData" :rowKey="record => (record.kh + record.gh)"></a-table>
          <a-table v-show="activeKey === '2'" :columns="openCoursesCoulmns" :dataSource="courseTableData" :rowKey="record => (record.kh + record.gh)"></a-table>
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
          <a-form
            :form="formDrop"
            @submit="handleDropCourse"
            v-show="activeKey === '31'"
          >
            <a-form-item
              label="课号"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 6 }"
            >
              <a-input
                v-decorator="[
                  'tkh',
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
                  'tgh',
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
          <a-table v-show="activeKey === '4'" :columns="reportCardColumns" :dataSource="reportCardData" :rowKey="record => (record.kh + record.zpcj)"></a-table>
          <ve-histogram :data="chartData" v-if="activeKey === '5'"></ve-histogram>
          <a-table v-show="activeKey === '6'" :columns="studentsColumns" :dataSource="studentsData" :rowKey="record => (record.xh)"></a-table>
          <div v-show="activeKey === '8'">
            <a-table :columns="reportCardTeacherColumns" :dataSource="reportCradTeacherData" bordered :rowKey="record => (record.xh + record.kh)">
              <template v-for="col in ['xm', 'xh', 'kh', 'km', 'pscj', 'kscj', 'zpcj']" :slot="col" slot-scope="text, record, index">
                <div :key="col">
                  <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChange(e.target.value, record, col)"
                  />
                  <template v-else>{{text}}</template>
                </div>
              </template>
              <template slot="operation" slot-scope="text, record, index">
                <div class='editable-row-operations'>
                  <span v-if="record.editable">
                    <a @click="() => save(record)">Save </a>
                    <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record)">
                      <a> Cancel</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a @click="() => edit(record)">Edit</a>
                  </span>
                </div>
              </template>
            </a-table>
          </div>
          <a-form
            :form="formOpen"
            @submit="handleSubmitOpen"
            v-show="activeKey === '9'"
          >
            <a-form-item
              label="课号"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 6 }"
            >
              <a-select
                v-decorator="[
                  'kh',
                  {rules: [{ required: true, message: '请输入课号' }]}
                ]"
                placeholder="课号"
                @change="handleSelectChange"
              >
                <a-select-option v-for="item in classes" :key="item.kh" :value="item.kh">
                  {{ item.km }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="上课时间"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 6 }"
            >
              <a-input
                v-decorator="[
                  'sksj',
                  {rules: [{ required: true, message: '请输入上课时间' }]}
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
function mySort(a, b) {
  let terms = ['秋季', '冬季', '春季', '夏季'];
  const [year, term] = a.split(' ');
  const [year1, term1] = b.split(' ');
  if(year < year1) {
    return -1;
  } else if (year===year1) {
    if(terms.indexOf(term) < terms.indexOf(term1)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    return 1;
  }
}
import { mapGetters } from 'vuex';
import api from '@/api';
import { openCoursesCoulmns, studentsColumns, reportCardColumns, openCoursesTeacherColumns, reportCardTeacherColumns } from './Column';
import { judgeJSObjectIsNull } from './util';
export default {
  name: 'index',
  data() {
    return {
      activeKey: '1',
      openCoursesCoulmns,
      studentsColumns,
      reportCardColumns,
      openCoursesTeacherColumns,
      reportCardTeacherColumns,
      openCoursesData: [],
      courseTableData: [],
      studentsData: [],
      reportCardData: [],
      openCoursesTeacherData: [],
      reportCradTeacherData: [],
      cacheData: [],
      form: this.$form.createForm(this),
      formOpen: this.$form.createForm(this),
      formDrop: this.$form.createForm(this),
      classes: []
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
      return this.role;
    },
    isTeacher() {
      if (this.role === 'teacher') {
        this.activeKey = '6';
      }
      return this.role === 'teacher';
    },
    isAdmin() {
      return this.role === 'admin';
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
      if(!userInfo) {
        return { nowTerm };
      }
      return { userInfo, nowTerm };
    }
  },
  watch: {
    userInfoTerm: {
      handler: function (val) {
        console.log('this function', val)
        if(!val.userInfo) {
          console.log('admin');
          return;
        }
        if (val.nowTerm && !judgeJSObjectIsNull(val.userInfo) && val.userInfo.gh) {
          this.loadCourseTeacherTable(val.userInfo.gh, val.nowTerm);
          this.loadReportCardTeacher(val.userInfo.gh, val.nowTerm);
          this.loadStudents();
        }
        if(val.nowTerm && !judgeJSObjectIsNull(val.userInfo) && val.userInfo.xh) {
          this.loadOpenCourse(val.nowTerm);
          this.loadCourseTable(val.nowTerm);
          this.loadReportCard(val.nowTerm);
        }
      },
      deep: true
    }
  },
  methods: {
    clickItem({ key }) {
      this.activeKey = key;
      if(this.isAdmin) {
        this.$store.commit('changeAdminTab', {
          tab: key
        });
      }
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
      if (!this.isTeacher) {
        api.getCourseTable(this.userInfo.xh, this.nowTerm).then(res => {
          this.courseTableData = res.data.res;
        });
      }
    },
    loadCourseTeacherTable(gh, term) {
      if (this.isTeacher) {
        api.getCourseTeacherTable(gh, term).then(res => {
          this.openCoursesTeacherData = res.data.res;
        })
      }
    },
    // 学生表
    loadStudents() {
      api.getStudents().then(res => {
        this.studentsData = res.data.res;
      })
    },
    // 成绩报告表
    loadReportCard(term) {
      if (!this.isTeacher) {
        api.getReportCard(this.userInfo.xh, term).then(res => {
          this.reportCardData = res.data.res;
        });
      }
    },
    loadReportCardTeacher(gh, xq) {
      api.getReportCardTeacher(gh, xq).then(res => {
        this.cacheData = res.data.res;
        this.reportCradTeacherData = res.data.res;
      })
    },
    // 选课表单提交
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const { kh, gh } = values;
          api.postXuanKe({ kh, gh, xh: this.userInfo.xh ,xq: this.nowTerm}).then(res => {
            if(res.data.res.affectedRows === 1) {
              this.$message.success('选课成功');
              this.form.resetFields();
              this.loadCourseTable(this.nowTerm);
              this.loadReportCard(this.nowTerm);
            } else {
              this.$message.error(res.data.res.message);
              this.form.resetFields();
            }
          });
        }
      });
    },
    // 退课
    handleDropCourse(e) {
      e.preventDefault();
      this.formDrop.validateFields((err, values) => {
        if(!err) {
          const { tkh, tgh } = values;
          api.dropCourse({ tkh, tgh, xh: this.userInfo.xh ,xq: this.nowTerm}).then(res => {
            if(res.data.res.affectedRows === 1) {
              this.$message.success('退课成功');
              this.formDrop.resetFields();
              this.loadCourseTable(this.nowTerm);
              this.loadReportCard(this.nowTerm);
            } else {
              this.$message.error(res.data.res.message);
              this.form.resetFields();
            }
          });
        }
      })
    },
    handleSubmitOpen(e) {
      e.preventDefault();
      this.formOpen.validateFields((err, values) => {
        if (!err) {
          const { kh, sksj } = values;
          api.postKaiKe({ kh, sksj, gh: this.userInfo.gh ,xq: this.nowTerm}).then(res => {
            if(res.data.res.affectedRows === 1) {
              this.$message.success('开课成功');
              this.formOpen.resetFields();
              this.loadCourseTeacherTable(this.userInfo.gh, this.nowTerm);
            } else {
              this.$message.error(res.data.res.message);
              this.formOpen.resetFields();
            }
          });
        }
      });
    },
    handleSelectChange(value) {
      this.formOpen.setFieldsValue({
        kh: value
      });
    },
    handleChange (value, record, column) {
      const newData = JSON.parse(JSON.stringify(this.reportCradTeacherData));
      const target = newData.filter(item => {
        if (record.kh === item.kh && record.xh === item.xh) {
          return true
        }
      })[0];
      if (target) {
        target[column] = value
        this.reportCradTeacherData = newData
      }
    },
    edit(record) {
      const newData = JSON.parse(JSON.stringify(this.reportCradTeacherData));
      const target = newData.filter(item => {
        if (record.kh === item.kh && record.xh === item.xh) {
          return true
        }
      })[0];
      if(target) {
        target.editable = true;
        this.reportCradTeacherData = newData;
      }
    },
    save(record) {
      const newData = JSON.parse(JSON.stringify(this.reportCradTeacherData));
      const target = newData.filter(item => {
        if (record.kh === item.kh && record.xh === item.xh) {
          return true
        }
      })[0];
      if (target) {
        delete target.editable
        this.reportCradTeacherData = newData
        this.cacheData = JSON.parse(JSON.stringify(this.reportCradTeacherData));
        // 发请求
        const params = {
          gh: this.userInfo.gh,
          xq: this.nowTerm,
          xh: target.xh,
          kh: target.kh,
          pscj: target.pscj,
          kscj: target.kscj,
          zpcj: target.zpcj
        };
        api.postManageGrade(params).then(res => {
          console.log(res, 'manage');
          this.$message.success("修改成功");
        });
      }
    },
    cancel(record) {
      const newData = JSON.parse(JSON.stringify(this.reportCradTeacherData));
      const target = newData.filter(item => {
        if (record.kh === item.kh && record.xh === item.xh) {
          return true
        }
      })[0];
      if (target) {
        Object.assign(target, this.cacheData.filter(item => {
          if (record.kh === item.kh && record.xh === item.xh) {
            return true;
          }
        })[0]);
        delete target.editable
        this.reportCradTeacherData = newData
      }
    },
    logout() {
      this.$store.commit('clearAll');
      sessionStorage.removeItem('accessToken');
      this.$message.success('退出登录成功');
      this.$router.push('/login');
    }
  },
  mounted() {
    api.getClasses().then(res => {
      this.classes = res.data.res;
    });
  },
}
</script>
