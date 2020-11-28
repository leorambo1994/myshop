var express = require('express');
var router = express.Router();

var Products = require('../models/model-products');


// GET 请求 (获取商品列表)
router.get('/', function(req, res, next) {
  
  Products.find( function (err,data) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    res.json(data);
  } );
});

// POST 请求 (添加商品)
router.post('/', function(req, res, next) {
  
  Products.create( req.body , function ( err , post ) {

    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    res.json(post);
  } );
});

// GET 指定的商品 by id
router.get('/:id', function(req, res, next) {
  
  Products.findById( req.params.id , function ( err , data) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    res.json(data);
  });
});

// 修改指定的商品 by id
router.put('/:id', function(req, res, next) {

  Products.findByIdAndUpdate( req.params.id , req.body , function ( err , post ) {
    if (err) {
      return next(err); //node.js 处理机制： 错误先行
    }

    // res.json(post);
    res.json({   // 返回一个JSON格式的对象
      code : "0",
      msg : "更新成功！"
    });
  });
});

// 删除指定的商品 by id
router.delete('/:id', function(req, res, next) {

  Products.findByIdAndRemove( req.params.id , function ( err , data ) {
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