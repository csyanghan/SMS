const Router = require('koa-router');
const Sql = require("../config/sql");
const router = new Router();
router.prefix('/api')

router.post('/login', async (ctx) => {
  const params = ctx.request.body;
  const res = await Sql.login({
    username: params.userName
  });
  let code = res.auth ? 403 : 200;
  ctx.response.status = code;
  ctx.body = {
    code: code,
    res: res
  }
})

// 开课表 总共开的课程
router.get('/openCourse', async (ctx) => {
  const { term } = ctx.request.query;
  const openclass = await Sql.openCourse(term);
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    res: openclass
  };
})

// 课程表 每个 学生选/老师上 的课
router.get('/courseTable', async (ctx) => {
  const { xh, term, gh } = ctx.request.query;
  const res = await Sql.courseTable({ xh, term, gh });
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    res: res
  }
})

// 成绩单
router.get('/reportCard', async ctx => {
  const { xh, term } = ctx.request.query;
  const res = await Sql.reportCard(xh, term);
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    res: res
  }
})

// 学生表
router.get('/students', async (ctx) => {
  await Sql.students().then(res => {
    ctx.response.status = 200;
    ctx.body = {
      code: 200,
      res: res
    }
  }).catch(err => {
    ctx.response.status = 500;
    ctx.body = {
      code: 500,
      res: err
    }
  })
});

// 学期
router.get('/terms', async ctx => {
  const terms = await Sql.terms();
  const res = terms.map(value => value.xq);
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    res
  };
})

router.post('/chooseCourse', async ctx => {
  const params = ctx.request.body;
  const res = await Sql.chooseCourse(params);
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    res
  };
});

router.post('/openCourse', async ctx => {
  const params = ctx.request.body;
  const res = await Sql.teacherOpenClass(params);
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    res
  };
});

router.get('/class', async ctx => {
  const res = await Sql.getClass();
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    res
  };
})

module.exports = router;