var express = require('express');
var router = express.Router();

var Banner = require('../models/model-banner');


// GET 请求 (获取轮播列表)
router.get('/', function (req, res, next) {

    Banner.find(function (err, data) {
        if (err) {
            return next(err); //node.js 处理机制： 错误先行
        }

        res.json(data);

    });

});

// POST 请求 (添加 Banner)
router.post('/', function (req, res, next) {

    Banner.create(req.body, function (err, post) {

        if (err) {
            return next(err); //node.js 处理机制： 错误先行
        }

        res.json(post);
    });
});

// GET 指定的 Banner by id
router.get('/:id', function (req, res, next) {

    Banner.findById(req.params.id, function (err, data) {
        if (err) {
            return next(err); //node.js 处理机制： 错误先行
        }

        res.json(data);
    });
});

// 修改指定的 Banner by id
router.put('/:id', function (req, res, next) {

    Banner.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
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

// 删除指定的 Banner by id
router.delete('/:id', function (req, res, next) {

    Banner.findByIdAndRemove(req.params.id, function (err, data) {
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