<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(form, 'avatar', res.url)"
            >
              <img v-if="form.avatar" :src="form.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(form, 'banner', res.url)"
            >
              <img v-if="form.banner" :src="form.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="form.categories" multiple>
              <el-option
                v-for="item in categories"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="form.scores.difficult"
              :max="9"
              show-score
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              v-model="form.scores.skills"
              :max="9"
              show-score
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              v-model="form.scores.attack"
              :max="9"
              show-score
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              v-model="form.scores.survice"
              :max="9"
              show-score
              style="margin-top: 0.6rem"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="form.items1" multiple>
              <el-option
                v-for="item in items"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="form.items2" multiple>
              <el-option
                v-for="item in items"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="form.usageTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="form.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="form.teamTips" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="form.skills.push({})">
            <i class="el-icon-plus"></i>
            添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in form.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="form.skills.splice(i, 1)"
                >
                  删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button size="small" @click="form.partners.push({})">
            <i class="el-icon-plus"></i>
            添加英雄</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in form.partners" :key="i">
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="form.partners.splice(i, 1)"
                >
                  删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeroEdit",
  data() {
    return {
      form: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
        },
        skills: [],
        partners: [],
      },
      categories: [], //分类
      items: [],
      heroes: [],
    };
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.form);
      } else {
        res = await this.$http.post("rest/heroes", this.form);
      }

      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // this.form = res.data;
      this.form = Object.assign({}, this.form, res.data);
      //相当于把this.form添加到空{},再把res.data添加到里面(只会添加this.form里面没有的)
    },
    // afterUpload(res) {
    //   this.form.avatar = res.url;
    // },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
    },
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    this.fetchHeroes();
    this.id && this.fetch();
  },
};
</script>

<style></style>
