<template>
  <div>
    <m-card title="新闻资讯" icon="cc-menu-circle">
      <list-card :categories="newsCats">
        <template #items="{ category }">
          <router-link
            tag="div"
            :to="`/articles/${news._id}`"
            class="py-2 fs-lg d-flex"
            v-for="(news, i) in category.newsList"
            :key="i"
          >
            <span class="text-info">[{{ news.categoriesName }}]</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
              news.title
            }}</span>
            <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
          </router-link>
        </template>
      </list-card>
    </m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "NewsCard",
  data() {
    return {
      newsCats: [],
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      // console.log(res.data);
      this.newsCats = res.data;
    },
  },
  created() {
    this.fetchNewsCats();
  },
};
</script>

<style></style>
