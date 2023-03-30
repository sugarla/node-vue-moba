<template>
  <div class="login-container">
    <el-card header="请登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {},
    };
  },
  created() {
    // if (localStorage.token) {
    //   this.$router.push("/");
    // }
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      // 拿到的token存起来
      localStorage.token = res.data.token;

      this.$router.push("/");
      this.$message({ type: "success", message: "登录成功" });
    },
  },
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>
