// 引入 mongoose
var mongoose = require('mongoose');

// 创建 product 的 schema
var productSchema = new mongoose.Schema({
    // id : Number,
    imgUrl : String,
    detail : String,
    price : Number,
});

// 输出这个model , module 是 node.js 自带的
module.exports = mongoose.model('model-products' , productSchema );