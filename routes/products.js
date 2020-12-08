var express = require('express');
var router = express.Router();

var Products = require('../models/model-products');


// GET 请求 (获取商品列表)
router.get('/', function (req, res, next) {

  Products.find(function (err, data) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    res.json(data);
  });
});

// POST 请求 (添加商品)
router.post('/', function (req, res, next) {

  Products.findOne({ detail: req.body.detail })
    .exec()
    .then(product => {
      if (product) {  // 该商品已经存在，需要用户重新提交
        return res.json({

          code: '1',
          msg: '该商品已存在!'
        });
      } else {

        const product_entity = new Products({

          imgUrl: req.body.imgUrl,
          detail: req.body.detail,
          price: req.body.price

        });

        product_entity   // promise 操作
          .save()
          .then(result => {

            console.log(result);
            res.json({
              code: '0',      // 写入数据库
              msg: '商品添加成功'
            });
          })
          .catch(err => {

            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    });

  // Products.create( req.body , function ( err , post ) {

  //   if (err) {
  //     return next(err); //node.js 处理机制： 错误先行
  //   }

  //   res.json(post);
  // } );
});

// GET 指定的商品 by id
router.get('/:id', function (req, res, next) {

  Products.findById(req.params.id, function (err, data) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    res.json(data);
  });
});

// 修改指定的商品 by id
router.put('/:id', function (req, res, next) {

  Products.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    // res.json(post);
    res.json({   // 返回一个JSON格式的对象
      code: "0",
      msg: "更新成功！"
    });
  });
});

// 删除指定的商品 by id
router.delete('/:id', function (req, res, next) {

  Products.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    // res.json(data);
    res.json({   // 返回一个JSON格式的对象
      code: '0',
      msg: '删除成功！'
    });
  });
});

module.exports = router;