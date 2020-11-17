var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

// 短信验证码
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var logger = require('morgan');

var cors = require('cors');  // 引入CORS

// 引入 body-Parser
var bodyParser = require('body-parser');

// 创建数据库，加载 mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // node.js 标准的 promise

// 连接 MongoDB ， 创建 DB 如：myshop
mongoose.connect('mongodb://localhost/myshop')
.then( () => console.log('connection success!'))
.catch( (err) => console.log(err) );

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products'); // 商品路由
var BannersRouter = require('./routes/banners'); // 轮播路由

var app = express();

// for sms code
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/myshop',
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// 位置必须在cookieParser之下
app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser()); // 设置中间件 bodyParser()

app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());  // CORS 中间件路由
//设置路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); // 商品路由
app.use('/banners', BannersRouter); // 轮播路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
