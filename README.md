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
yarn dev

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

## 主要功能

* 角色

    * 学生

      * 查看当前学期所有老师开设的所有课程
      * 查看自己的选课情况
      * 选课(课号+教师号)
      * 退课(课号+教师号)
      * 成绩单
      * 成绩单可视化

    * 老师

      * 查看所有的学生
      * 成绩管理
      * 开设课程
      * 课程表

## 存储过程与触发器

  * 触发器

    再老师更改成绩后，学生处显示自己所有课程的平均成绩

    ```sql
    create trigger tri_zpcj after update on xuankeTable for each row
    begin
      declare g_avg int;
      set g_avg = (select avg(zpcj) from xuankeTable where xh=new.xh);
      update student set grade=g_avg where xh=new.xh;
    end
    ```

    查看触发器: `SHOW TRIGGERS`
  
  * 存储过程

    老师输入平时成绩和考试成绩  调用存储过程更改总评成绩

    ```sql
    create procedure change_zpcj(in xhs varchar(256))
    begin
	    update xuankeTable set zpcj=(pscj *0.7 + kscj * 0.3) where xh=xhs;
    end
    ```

    删除存储过程: `drop procedure name`

    查看存储过程: `show procedure status like name`
  