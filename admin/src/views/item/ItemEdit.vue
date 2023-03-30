<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + 'upload'"
          :show-file-list="false"
          :on-success="afterUpload"
          :headers="getAuthHeaders()"
        >
          <img v-if="form.icon" :src="form.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ItemEdit",
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
        res = await this.$http.put(`rest/items/${this.id}`, this.form);
      } else {
        res = await this.$http.post("rest/items", this.form);
      }

      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.form = res.data;
    },
    afterUpload(res) {
      this.$set(this.form, "icon", res.url);
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style></style>
