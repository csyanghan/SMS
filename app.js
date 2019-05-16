const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const app = new Koa();
app.use(bodyParser());
app.use(logger());

// 路由
const router = require('./router/index');
app.use(router.routes());

app.listen(8100, console.log('koa2 is running at http://127.0.0.1:8100'));
