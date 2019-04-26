const dbPool = require("./db");

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    dbPool.getConnection((err, conn) => {
      if(err) {
        reject(err);
      } else {
        conn.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          dbPool.releaseConnection(conn);
        })
      }
    })
  })
}

// 登录
exports.login = async ({
  username
}) => {
  const _sql = 'select * from student where `xh` = ?';
  return query(_sql, [username]).then(res => {
    if (res.length === 1) {
      return {
        userInfo: res[0],
        role: 'student'
      };
    }
    const __sql = 'select * from teacher where `gh` = ?';
    return query(__sql, [username]).then(res1 => {
      if (res1.length === 1) {
        return {
          userInfo: res1[0],
          role: 'teacher'
        }
      }
      return {
        auth: 'fail'
      };
    });
  });
}

// 开课表
exports.openCourse = (term) => {
  const _sql = 'select c.xq, cl.km, c.kh, c.sksj, t.xm, t.gh from openclass as c, teacher as t, class as cl where c.gh = t.gh and c.kh = cl.kh and c.xq = ?';
  return query(_sql, [term]);
}

// 课程表
exports.courseTable = (data) => {
  const { xh, term, gh } = data;
  const _sql = `
    select x.xq, x.kh, c.km, o.sksj, t.xm, t.gh from xuankeTable as x, openclass as o, class as c, teacher as t where
      x.kh=o.kh and x.gh=o.gh
      and c.kh=x.kh and t.gh = x.gh and x.xh = ? and x.xq = ?
  `;
  const __sql = `
    select x.kh, c.km, x.sksj from openclass as x, class as c where c.kh = x.kh and x.gh = ? and x.xq = ?
  `;
  if (xh) {
    return query(_sql, [xh, term]);
  }
  if (gh) {
    return query(__sql, [gh, term]);
  }
}

// 学生表
exports.students = () => {
  const _sql = 'select s.xh, s.xm, s.xb, s.csrq, s.jg, s.sjhm, d.mc from student as s, department as d where s.yxh=d.yxh'
  return query(_sql);
}

// 学期
exports.terms = () => {
  const _sql = 'select distinct xq from openclass';
  return query(_sql);
}

// 成绩单
exports.reportCard = (xh, term, gh) => {
  const _sql = 'select  x.kh, c.km, x.pscj, x.kscj, x.zpcj from xuankeTable as x, class as c where x.xh = ? and x.xq = ? and x.kh=c.kh';
  if (xh) {
    return query(_sql, [xh, term]);
  }
  const __sql = 'select s.xm, x.xh, x.kh, c.km, x.pscj, x.kscj, x.zpcj from xuankeTable as x, class as c, student as s where x.gh = ? and x.xq = ? and x.kh = c.kh and x.xh = s.xh';
  if (gh) {
    return query(__sql, [gh, term]).then(res => {
      return res;
    });
  }
}

let chooseCourse = null;
exports.chooseCourse = chooseCourse = ({xh, xq, kh, gh}) => {
  const check = 'select * from xuankeTable as x where x.xh = ? and x.xq = ? and x.kh = ? and x.gh = ?';
  return query(check, [xh, xq, kh, gh]).then(res => {
    if (res.length) {
      return {
        message: '已经存在这条记录了'
      }
    }
    const _sql = 'insert into xuankeTable (xh, xq, kh, gh) values (?, ?, ?, ?)';
    return query(_sql, [xh, xq, kh, gh]);
  });
}

exports.dropCourse = async ({xh, xq, tkh, tgh}) => {
  const res = await chooseCourse({xh, xq, kh: tkh, gh: tgh});
  if(res.message === '已经存在这条记录了') {
    const _sql = 'delete from xuankeTable where xh=? and xq = ? and kh = ? and gh = ?';
    return query(_sql, [xh, xq, tkh, tgh]);
  } else {
    return {
      message: '你没有这条选课记录'
    }
  }
};

exports.teacherOpenClass = ({xq, kh, gh, sksj}) => {
  const check = 'select * from openclass as o where o.xq = ? and o.kh = ? and o.gh = ?';
  return query(check, [xq, kh, gh]).then(res => {
    if (res.length) {
      return {
        message: '你已经开过这门课了'
      }
    }
    const _sql = 'insert into openclass (xq, kh, gh, sksj) values (?, ?, ?, ?)';
    return query(_sql, [xq, kh, gh, sksj]);
  })
}

exports.getClass = () => {
  const _sql = 'select c.kh, c.km from class as c';
  return query(_sql);
}

exports.manageGrade = ({gh, xq, xh, kh, pscj, kscj, zpcj }) => {
  const _sql = 'update xuankeTable set pscj = ?, kscj = ?, zpcj = ? where gh = ? and xq = ? and xh = ? and kh = ?';
  return query(_sql, [pscj, kscj, zpcj, gh, xq, xh, kh]);
}