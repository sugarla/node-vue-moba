<template>
  <div>
    <home-swiper></home-swiper>
    <home-icon></home-icon>
    <news-card></news-card>
    <hero-card></hero-card>
    <video-card></video-card>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";
import HomeIcon from "@/views/home/childComps/HomeIcon.vue";

import NewsCard from "@/views/home/childComps/news/NewsCard.vue";
import HeroCard from "@/views/home/childComps/hero/HeroCard.vue";
import VideoCard from "@/views/home/childComps/video/VideoCard.vue";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeIcon,
    NewsCard,
    HeroCard,
    VideoCard,
  },
};
</script>

<style></style>
