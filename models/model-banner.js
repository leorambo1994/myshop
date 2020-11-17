// 引入 mongoose
var mongoose = require('mongoose');

// 创建 banner 的 schema
var bannerSchema = new mongoose.Schema({
    name : String,
    imageFeaturedUrl : String,
});

// 输出这个model , module 是 node.js 自带的
module.exports = mongoose.model('model-banner' , bannerSchema );