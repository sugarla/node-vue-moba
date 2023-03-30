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
        { url: require("@/assets/img/ad1.png") },
        { url: require("@/assets/img/ad2.png") },
        { url: require("@/assets/img/ad3.png") },
      ],
    };
  },
  components: {
    ImageSwiper,
  },
};
</script>

<style lang="scss"></style>
