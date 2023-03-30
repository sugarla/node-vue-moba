/*
    存放分类相关的数据模型
 */
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  name: { type: String },
});

schema.virtual("children", {
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  ref: "Category",
});

schema.virtual("newsList", {
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  ref: "Article",
});
module.exports = mongoose.model("Category", schema);
