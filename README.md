## 学生成绩管理系统

本repo是数据库作业, 主要是熟悉`sql`命令的使用，`sql注入`的问题就不考虑了

* 后端

  * mysql2
  * koa2, koa-router, koa-logger, koa-bodyparser

* 前端

  * Vue
  * Vue Antd
  * echarts, v-charts

* 开发流程

```bash

git clone git@github.com:Ctum/SMS.git

cd SMS

touch config.json

/**
写入 config 像下面
{
  "host": "your database ip address",
  "password": "your password"
}
**/

yarn

# 拉起后端
node app.js

cd front

yarn

# 运行前端
yarn serve

```

* API
```js

DONE

- POST /api/login       data: { userName, password }

- GET /api/openCourse   data: { params: { term } }

// xh,gh 选传一个
- GET /api/courseTable  data: { params: { xh, term, gh }}

// xh,gh 选传一个
// gh 表示这个老师某个学期所教学生的成绩单
- GET /api/reportCard   data: { params: { xh, term, gh }}

- GET /api/students

- GET /api/terms

- POST /api/chooseCourse    data: { xh, xq, kh, gh }

- POST /api/openCourse      data: { xq, kh, gh, sksj }

- POST /api/manageGrade     data: { list: [ { xh, kh, pscj, kscj, zpcj }] }


```

* 合法用户

查看 [sql](./config/school.sql)中的`student`和`teacher`表， 使用`xh`或`gh`登录，密码任意，但不能为空

eg:

{
  username: 1101,
  password: 1101
}

为学生`李明`账号

©MIT
