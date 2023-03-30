<template>
  <div>
    <m-card title="英雄列表" icon="big-hero">
      <hero-swipe></hero-swipe>
      <list-card :categories="listCats" class="mt-3">
        <template #items="{ category }">
          <div class="d-flex flex-wrap" style="0 -0.5rem">
            <router-link
              :to="`heroes/${hero._id}`"
              class="p-2 text-center"
              style="width: 20%"
              v-for="(hero, i) in category.heroList"
              :key="i"
            >
              <img :src="hero.avatar" class="w-100" />
              <div>{{ hero.name }}</div>
            </router-link>
          </div>
        </template>
      </list-card>
    </m-card>
  </div>
</template>

<script>
import HeroSwipe from "./HeroSwipe.vue";
export default {
  name: "HomeHeroCard",
  components: {
    HeroSwipe,
  },
  data() {
    return {
      listCats: [],
    };
  },
  methods: {
    async fetchHeroesCats() {
      const res = await this.$http.get("heroes/list");
      // console.log(res.data);
      this.listCats = res.data;
    },
  },
  created() {
    this.fetchHeroesCats();
  },
};
</script>

<style></style>
