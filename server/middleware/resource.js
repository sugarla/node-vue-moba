module.exports = (options) => {
  return async (req, res, next) => {
    // 将接收的复数地址名转化为单数模型名，如: categories ->category
    const modelName = require("inflection").classify(req.params.resource);

    req.Model = require(`../models/${modelName}`);
    console.log(req.Model);
    next();
  };
};
