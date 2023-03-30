const express = require("express");

const app = express();

app.set("sercet", "euiadvgffgadfa");

app.use(require("cors")());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./plugins/db")(app);
require("./routes/admin")(app);
require("./routes/web")(app);

app.listen(3000, () => {
  console.log("启动成功，欢迎访问http://localhost:3000");
});
