<template>
  <div>
    <image-swiper :image="image"></image-swiper>
  </div>
</template>

<script>
import ImageSwiper from "@/components/common/ImageSwiper.vue";

export default {
  name: "HomeSwiper",
  data() {
    return {
      image: [
        { url: require("@/assets/img/ad4.jpg") },
        { url: require("@/assets/img/ad5.jpg") },
        { url: require("@/assets/img/ad6.jpg") },
        { url: require("@/assets/img/ad7.jpg") },
        { url: require("@/assets/img/ad8.jpg") },
      ],
    };
  },
  components: {
    ImageSwiper,
  },
};
</script>

<style lang="scss"></style>
