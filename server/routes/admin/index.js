/* 
    这里是写跟admin后台管理系统有关的具体路由
 */
module.exports = (app) => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");

  const router = express.Router({
    mergeParams: true,
  });

  // 添加
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 查询列表
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const items = await req.Model.find().setOptions(queryOptions);

    res.send(items);
  });

  // 根据id查询某个
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  // 修改某个
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除某个
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  });

  // 登录校验中间件和资源中间件
  const authMiddleware = require("../../middleware/auth");
  const resourceMiddleware = require("../../middleware/resource");

  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  //文件上传
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });

  app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });

  // 登录接口
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    // 1.根据用户名找用户
    const AdminUser = require("../../models/AdminUser");
    const user = await AdminUser.findOne({ username }).select("+password");
    assert(user, 422, "请登录");

    // 2.校验密码
    const isValid = require("bcryptjs").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");

    // 3.返回token
    const token = jwt.sign(
      {
        id: user._id,
      },
      app.get("sercet")
    );
    res.send({ token });
  });

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
