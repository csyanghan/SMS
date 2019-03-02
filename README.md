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

- GET /api/reportCard   data: { params: { xh, term }}

- GET /api/students

- GET /api/terms

TODO

- POST /api/chooseCourse    data: { xh, xq, kh, gh }

- POST /api/manageGrade     data: { list: [ { xh, kh, pscj, kscj, zpcj }] }

- POST /api/openCourse      data: { xq, kh, gh, sksj }



```
©MIT
