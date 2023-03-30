/*
    存放英雄相关的数据模型
 */
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  scores: {
    difficult: { type: Number }, //难度
    skills: { type: Number }, //技能
    attack: { type: Number }, //攻击
    survice: { type: Number }, //生存
  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      delay: { type: String }, //冷却值
      cost: { type: String }, //消耗
      description: { type: String }, //描述
      tips: { type: String }, //小提示
    },
  ],
  //顺风出装
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  // 逆风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  usageTips: { type: String }, // 使用技巧
  battleTips: { type: String }, // 战斗技巧
  teamTips: { type: String }, // 团队思路
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String },
    },
  ],
});

module.exports = mongoose.model("Hero", schema, "heroes");
