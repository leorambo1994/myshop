var express = require('express');
var router = express.Router();

var User = require('../models/model-user');

// 短信验证码引入
// var IHuyi = require("ihuyi106");
// var account = "your_account";
// var password = "your_password";
// var mobile = "158********";
// var iCountryCode = "1";
// var iMobile = "63*********";
// var content = "Hello world!";

// apiKey is optional
// var iHuyi = new IHuyi(account, password, apiKey);
// var iHuyi = new IHuyi(account, password);



/* ---------------------------------------- */
// GET 获取用户列表
router.get('/', function (req, res, next) {

  User.find(function (err, users) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    res.json(users);
  });
});

// login 用 POST 方法
router.post('/login', function (req, res, next) {

  // 查询该用户是否存在
  User.findOne({ username: req.body.username }, function (err, user) {

    if (err) throw "user not found";

    if (user) { // 如果用户存在
      if (req.body.password == user.password) {
        res.json({
          code: '0',
          msg: '登录成功'
        });
      } else {
        res.json({
          code: '1',
          msg: '密码错误'
        });
      }
    }
    else {  // 如果用户不存在
      res.json({
        code: '2',
        msg: '用户不存在'
      });
    }

  });

});

// register POST 请求
// router.post('/register', function(req, res, next) {

//   User.create( req.body , function ( err , post ) {

//     if (err) {
//       return next(err); //node.js 处理机制： 错误先行
//     }

//     res.json(post);
//   } );
// });

// check 验证码
function checkSmsCode(req, checkObj) {
  // 检查上一次 session 值与 用户这一次注册提交的验证码、手机号是否一致

  if ((req.session.userInfo.mobile == checkObj.mobile) && (req.session.userInfo.smscode == checkObj.smscode)) {
    return obj = {
      code: '0',
      msg: "验证成功"
    };
  } else {
    return obj = {
      code: '1',
      msg: "验证失败"
    };
  }
}

// 注册 register POST 请求
router.post('/register', function (req, res, next) {

  // var phone_number = req.body.mobile;
  // var sms_code = req.body.smscode;

  // var checkObj = {
  //   mobile: phone_number,
  //   smscode: sms_code
  // };

  User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (user) {  // 该用户已经存在，需要用户重新提交注册
        return res.json({

          code: '1',
          msg: '用户名已存在!'
        });
      } else {

        // 检查 session 是否合法
        // var resObj = checkSmsCode(req , checkObj);

        // if (resObj.code == '0') {

        const user_entity = new User({

          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          mobile: req.body.mobile

        });

        user_entity   // promise 操作
          .save()
          .then(result => {

            console.log(result);
            res.json({
              code: '0',      // 写入数据库
              msg: '用户注册成功'
            });
          })
          .catch(err => {

            console.log(err);
            res.status(500).json({
              error: err
            });
          });

        // } 
        //   else {
        //   res.json({
        //     code: '1',
        //     msg: '短信验证失败'
        //   });
        // }
      }
    });
});


// 获取短信验证码
// router.post('/smscode', function (req, res, next) {

//   var phone_number = req.body.mobile;
//   var sms_code = (Math.random() * 6).toString();
//   var content = "您的验证码：" + sms_code;

//   iHuyi.send(phone_number, content, function (err, smsId) {
//     if (err) {
//       console.log(err.message);

//       res.json({
//         code: '1',
//         msg: "验证码发送失败"
//       });
//     } else {

//       req.session.userInfo = {
//         smscode: sms_code,
//         mobile: phone_number,
//         send_time: new Date().getTime()
//       };
//       console.log("SMS sent, and smsId is " + smsId);
//       res.json({
//         code: '0',
//         msg: "验证码发送成功"
//       });
//     }
//   });

//   // var phone_number = req.body.mobile;

//   // req.session.mobile = {
//   //   session_key : phone_number
//   // };
//   // res.json({
//   //   session_code : req.session.mobile
//   // });
// });

// 验证是否有 session?
router.post('/test-is-login', function (req, res, next) {
  if (!req.session.mobile) {
    console.log('no session!');
    res.json({ mobile: '0' });
  } else {
    console.log('user login is ok!');
    res.json({ mobile: req.session.mobile });
  }
});

// GET 指定的用户 by id
router.get('/:id', function(req, res, next) {
  
  User.findById( req.params.id , function ( err , data) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    res.json(data);
  });
});

// 修改指定的用户 by id
router.put('/:id', function(req, res, next) {

  User.findByIdAndUpdate( req.params.id , req.body , function ( err , put ) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    // res.json(put);
    res.json({   // 返回一个JSON格式的对象
      code : "0",
      msg : "用户修改成功！"
    });
  });
});

// 删除指定的用户 by id
router.delete('/:id', function(req, res, next) {

  User.findByIdAndRemove( req.params.id , function ( err , data ) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    // res.json(data);
    res.json({   // 返回一个JSON格式的对象
      code : '0',
      msg : '删除成功！'
    });
  });
});


module.exports = router;