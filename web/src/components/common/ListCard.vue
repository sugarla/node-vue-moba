<template>
  <div>
    <div class="nav jc-between">
      <div
        class="nav-item"
        v-for="(category, i) in categories"
        :key="i"
        :class="{ active: active === i }"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper
        ref="list"
        :options="{ autoHeight: true }"
        @slide-change="() => (active = $refs.list.swiper.realIndex)"
      >
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"> </slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListCard",
  props: {
    categories: { type: Array, default: () => [], required: true },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style></style>
