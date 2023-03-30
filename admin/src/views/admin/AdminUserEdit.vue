<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminUserEdit",
  data() {
    return {
      form: {},
    };
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.form);
      } else {
        res = await this.$http.post("rest/admin_users", this.form);
      }

      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      // 获取单个文章
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.form = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style></style>
