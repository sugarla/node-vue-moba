<template>
  <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
    <div class="d-flex flex-wrap">
      <div class="nav-item mb-3" v-for="n in 10" :key="n">
        <i class="sprite sprite-news"></i>
        <div class="py-2">爆料站</div>
      </div>
    </div>
    <div class="bg-light py-2 fs-sm">
      <i class="sprite sprite-arrow mr-2"></i>
      <span>收起</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavIcon",
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;

  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      // 4n,4的倍数，第4个第8个
      border-left: none;
    }
  }
}
</style>
