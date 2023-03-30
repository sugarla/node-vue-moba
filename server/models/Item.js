/*
    存放物品相关的数据模型
 */
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
});

module.exports = mongoose.model("Item", schema);
