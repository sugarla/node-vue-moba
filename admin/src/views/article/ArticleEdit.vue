<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="form.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          v-model="form.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ArticleEdit",
  data() {
    return {
      form: {},
      categories: [],
    };
  },
  components: {
    VueEditor,
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.form);
      } else {
        res = await this.$http.post("rest/articles", this.form);
      }

      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      // 获取单个文章
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.form = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      console.log(res);
      this.categories = res.data;
    },
    // 自定义上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  },
};
</script>

<style></style>
