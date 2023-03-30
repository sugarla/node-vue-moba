const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, //前台密码不可见，散列一次
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
});

module.exports = mongoose.model("AdminUser", schema);
