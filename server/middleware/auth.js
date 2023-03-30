module.exports = (options) => {
  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../models/AdminUser");

  return async (req, res, next) => {
    // 1.拿到token
    console.log(req.headers);
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    assert(token, 401, "请提供token"); //未提供token

    // 2.解密token
    const { id } = jwt.verify(token, req.app.get("sercet"));
    assert(id, 401, "token无效"); //无效的token

    // 3.根据解密出来的id检查用户是否存在
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, "用户不存在"); //用户存在

    await next();
  };
};
