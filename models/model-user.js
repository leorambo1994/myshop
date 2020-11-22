// 引入 mongoose
var mongoose = require('mongoose');

// 创建 user 的 schema
var userSchema = new mongoose.Schema({

    username : String,
    password : String,
    email : String,
    mobile : Number,
});

// 输出这个model , module 是 node.js 自带的
module.exports = mongoose.model('model-user' , userSchema );