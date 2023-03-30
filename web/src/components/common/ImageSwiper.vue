<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in image">
        <img class="w-100" :src="item.url" />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "MySwiper",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home",
        },
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        loop: true,
      },
    };
  },
  props: {
    image: {
      type: Array,
      default: [],
      require: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");

    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
</style>
