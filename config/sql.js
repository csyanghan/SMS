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
exports.courseTable = (xh, term) => {
  const _sql = `
    select x.xq, x.kh, c.km, o.sksj, t.xm, t.gh from xuankeTable as x, openclass as o, class as c, teacher as t where
      x.kh=o.kh and x.gh=o.gh
      and c.kh=x.kh and t.gh = x.gh and x.xh = ? and x.xq = ?
  `;
  return query(_sql, [xh, term]);
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
exports.reportCard =async (xh, term) => {
  const _sql = 'select  x.kh, c.km, x.pscj, x.kscj, x.zpcj from xuankeTable as x, class as c where x.xh = ? and x.xq = ? and x.kh=c.kh';
  return query(_sql, [xh, term]);
}
